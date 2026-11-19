import type { BlogPost } from "./types";

const slug = "rss-to-discord-harbinger-architecture";

const Body = () => (
  <>
    <p>
      Harbinger started as a complaint. The existing options for piping RSS
      feeds into Discord webhooks were either paid SaaS with per-feed limits,
      or open-source bots that wanted to run as full Discord applications with
      bot tokens, slash commands, and a database I didn&apos;t want to operate.
      All I wanted was a small program that watched a list of feeds, posted
      new items to a list of webhooks, and let me control the formatting.
      That&apos;s a hundred lines of code at most. I wrote a thousand and I
      stand by it.
    </p>
    <p>
      This post is a tour of how Harbinger is put together — multi-feed,
      multi-webhook, custom formatting, and the small architectural choices
      that turned a weekend script into something I&apos;ve been running
      unattended for a long time. If you&apos;re building a similar
      &quot;poll something, push it somewhere&quot; service, the shape of the
      problem is more interesting than it looks.
    </p>

    <h2>The deceptively simple problem</h2>
    <p>
      An RSS-to-webhook bridge sounds like a one-liner. Fetch a feed, diff it
      against last time, post the new items. The trouble starts the moment
      you have more than one feed and more than one destination, because now
      you have a many-to-many mapping problem with state. Feed A might post
      to webhooks 1 and 2. Feed B might post to webhooks 2 and 3. The
      formatting for the same feed might differ by destination — a tech feed
      going into a casual channel wants a friendly emoji, but the same feed
      going into a status-board channel wants a terse one-liner.
    </p>
    <p>
      Treating that as &quot;one feed, one webhook&quot; and running multiple
      processes is tempting and wrong. You end up fetching the same feed
      multiple times, duplicating state, and racing yourself when a feed
      updates. The right shape is a single fetch loop per feed, fanned out to
      a list of destinations, each with its own formatter.
    </p>

    <h2>Configuration as the public API</h2>
    <p>
      The thing users actually interact with is the config file. Everything
      else is implementation. Harbinger&apos;s config is a flat list of
      feed-to-webhook bindings — each one specifies the source URL, the
      destination webhook, an optional formatter, and an optional poll
      interval override. Multiple bindings can share a feed URL or a webhook
      URL freely. The runtime deduplicates: each unique feed URL gets one
      polling task, each unique destination gets one HTTP client.
    </p>
    <p>
      Keeping the config flat (rather than nesting webhooks under feeds, or
      vice versa) was a small decision that paid off repeatedly. Adding a new
      destination for an existing feed is a one-line change. Splitting a
      single feed into two destinations with different formatters is two
      lines. The mental model maps cleanly onto how people actually think
      about the problem: &quot;I want this feed to show up in this channel,
      formatted like this.&quot;
    </p>

    <h2>State: the boring part that ruins everything</h2>
    <p>
      The single hardest piece of an RSS bridge is the &quot;new since last
      time&quot; check. RSS items don&apos;t have stable, well-behaved IDs.
      The <code>guid</code> field is supposed to be unique but it&apos;s
      optional, and a depressing number of feeds either omit it or change it
      when the post is edited. The <code>pubDate</code> field is human-edited
      and lies routinely. Some feeds rewrite their entire body when a post
      gets a typo fix and you&apos;ll happily re-post the same article five
      times if you trust content hashes alone.
    </p>
    <p>
      Harbinger&apos;s answer is layered. First preference is the{" "}
      <code>guid</code>. Second is a hash of <code>(title, link)</code>,
      because those tend to be stable even when the body changes. The state
      store is a tiny per-feed file containing the set of seen identifiers,
      capped at the last few hundred entries — small enough to read in one
      shot, large enough that a feed&apos;s historical window doesn&apos;t
      cause replays when state gets restored from backup. The cap matters: an
      unbounded set grows forever and an empty set replays the entire feed on
      first run after a reset.
    </p>
    <p>
      First-run behavior was a surprisingly important design choice. The
      naive approach is to post everything in the feed when the bridge first
      sees it, which means a new binding spams its destination with months of
      backlog. Harbinger does the opposite: on first sight of a feed, it
      records all current items as seen and posts nothing. The cost is that
      you miss anything that arrives between the moment you write the config
      and the moment the bridge first polls. The benefit is that nobody is
      ever angry at you for spamming a channel with old news.
    </p>

    <h2>Polling: politeness as a feature</h2>
    <p>
      Discord webhooks are rate-limited. Source feeds get cranky if you poll
      them too often. The naive loop — &quot;every 60 seconds, fetch every
      feed&quot; — is fine for two feeds and an angry phone call when you
      have fifty. Harbinger spaces out polls per feed, honors{" "}
      <code>Cache-Control</code> and <code>ETag</code> headers when feeds
      provide them, and applies jitter so a fleet of bridges doesn&apos;t all
      hit the same feed on the same second after a restart.
    </p>
    <p>
      The conditional-GET support is worth special mention. A feed that
      returns <code>304 Not Modified</code> costs almost nothing for the
      remote server and zero for the bridge. Ignoring those headers is
      free for you and rude to the publisher; respecting them takes about
      ten lines of code and meaningfully reduces the load you put on
      somebody else&apos;s infrastructure. If you build something that polls
      other people&apos;s servers, build it polite by default.
    </p>

    <h2>Formatting as a pluggable concern</h2>
    <p>
      Discord webhooks accept either a plain content string or a richer
      embed structure with title, description, color, fields, and so on.
      Different feeds want different shapes. A release-notes feed reads well
      as an embed with the version as the title. A short status feed reads
      better as a one-line content string. A media feed with a hero image
      wants the embed treatment, with the image as the embed image and the
      summary truncated to a reasonable length.
    </p>
    <p>
      Harbinger handles this by treating the formatter as a function from a
      parsed feed item to a Discord webhook payload. There&apos;s a small
      set of built-in formatters — <code>plain</code>, <code>embed</code>,
      <code>compact</code> — and the config just names which one to use per
      binding. Adding a new formatter is a single function and a registry
      entry. This is more abstraction than the problem strictly needs for two
      formatters, but the alternative is a tangle of conditionals on a
      &quot;style&quot; string and you regret it the moment a fourth case
      shows up.
    </p>

    <h2>Failure handling: small budgets, loud logs</h2>
    <p>
      Things that go wrong: a feed returns 500. A feed returns 200 with HTML
      because Cloudflare ate the request. A webhook is deleted out from under
      you. Your network drops out for thirty seconds. A feed renames every
      item&apos;s guid because the publisher migrated CMSes overnight.
    </p>
    <p>
      The general approach is small retry budgets, exponential backoff, and
      loud structured logs. A feed that fails three times in a row gets
      backed off to a longer interval, with a log line that names the feed
      and the error class. A webhook that returns a hard 4xx — &quot;this
      webhook does not exist&quot; — gets disabled with a log line that says
      so, because retrying it forever buys nothing. A webhook that returns a
      transient 5xx gets queued and retried. The key is making the logs
      grep-able: every retry, every disable, every guid-mass-rename event
      gets a single recognizable line so a future me can answer &quot;why is
      this feed quiet&quot; without spelunking through stack traces.
    </p>

    <h2>What I&apos;d change if I rewrote it tomorrow</h2>
    <p>
      Two things. First, the state store is a per-feed file, which is fine
      for the volume I run but doesn&apos;t survive being run on more than
      one host without a shared filesystem. A small key-value store —
      anything from SQLite to a managed Redis — would let Harbinger scale
      horizontally. I haven&apos;t needed it. Someone else might.
    </p>
    <p>
      Second, the formatter API is synchronous. That was the right call for
      simple text transformations and the wrong call the moment I wanted a
      formatter that, say, fetched the article&apos;s OG image to embed.
      Making the formatter async is mechanical but invasive — it touches the
      polling loop, the queue, and the retry path — and it&apos;s the kind
      of refactor that keeps getting pushed because the synchronous version
      keeps working.
    </p>
    <p>
      Both of those are growing-pain problems, not architectural mistakes.
      The original shape — config-driven, dedup at the runtime, layered
      state, polite polling, pluggable formatting — has held up across years
      of unattended operation against feeds and webhooks that have changed
      under it more than once. The smallest version of a service that
      survives is usually the one where every piece does one thing well, and
      the boundaries between pieces are obvious enough that swapping any
      single one out is a change you can make without thinking too hard.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "Inside Harbinger: an RSS-to-Discord bridge built to be left alone",
  description:
    "How a small RSS-to-Discord webhook bridge is designed: flat config, layered state, polite polling, pluggable formatting, and failure modes that don&apos;t wake you up.",
  publishedAt: "2025-12-08",
  readingTime: 8,
  tags: [
    "Node.js",
    "TypeScript",
    "RSS",
    "Discord",
    "Distributed Systems",
    "Side Projects",
  ],
  Body,
};

export default post;
