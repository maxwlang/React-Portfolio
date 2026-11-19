import type { BlogPost } from "./types";

const slug = "fastify-vs-express-throughput";

const Body = () => (
  <>
    <p>
      Express is the default Node web framework the way{" "}
      <code>setTimeout</code> is the default scheduler: it works, it&apos;s
      everywhere, and most people pick it without thinking. For a long time
      that was a reasonable choice. The Node ecosystem has changed underneath
      it. If you&apos;re building a high-throughput service in 2025, the
      defaults aren&apos;t free anymore.
    </p>
    <p>
      This post is the framework-choice conversation I&apos;ve had a few
      times: when does Express stop being the right answer, and what should
      you reach for instead? The short version is &quot;Fastify, usually.&quot;
      The long version is more interesting because the reasons aren&apos;t
      really about benchmarks.
    </p>

    <h2>Throughput is not the headline</h2>
    <p>
      Yes, Fastify is faster than Express in published benchmarks — usually
      cited at 2-3x requests per second on hot paths. That number is real
      but it&apos;s the least interesting reason to pick it. In a real
      production service, your bottleneck is almost never the framework. It&apos;s
      the database, the downstream HTTP call, the JSON deserialization of a
      large payload, or a single synchronous-feeling library that&apos;s
      blocking the event loop.
    </p>
    <p>
      The framework can become the bottleneck under specific conditions:
      very small payloads, very high request rates, very lean handlers. If
      you&apos;re building a hot path that proxies requests, fans out to
      caches, or does lightweight transformation at five-figure RPS,
      framework overhead matters. For everything else, the throughput delta
      between Fastify and Express is in the noise. Pick on something else.
    </p>

    <h2>What actually matters: the validation story</h2>
    <p>
      The single biggest difference between Fastify and Express, in practice,
      is that Fastify is built around schema validation. Every route declares
      a JSON Schema for its body, query, params, and response. The framework
      validates input on the way in and the response on the way out, with a
      compiled validator (Ajv) that&apos;s about as fast as schema
      validation gets in Node.
    </p>
    <pre>
      <code>{`fastify.post<{ Body: { tenantId: string; amount: number } }>(
  "/charges",
  {
    schema: {
      body: {
        type: "object",
        required: ["tenantId", "amount"],
        properties: {
          tenantId: { type: "string", format: "uuid" },
          amount: { type: "number", minimum: 1 },
        },
      },
      response: {
        200: { type: "object", properties: { id: { type: "string" } } },
      },
    },
  },
  async (req) => createCharge(req.body),
);`}</code>
    </pre>
    <p>
      In Express, you do this with middleware: <code>express-validator</code>,{" "}
      <code>zod</code> wrappers, hand-rolled checks. Each is fine. But each
      is opt-in, which means in any service older than six months, you have
      a few endpoints that &quot;just trust the body&quot; because they were
      written before validation became the convention. Fastify makes
      validation the default. The path of least resistance produces correct
      services.
    </p>

    <h2>Plugin scope and lifecycle</h2>
    <p>
      Fastify&apos;s plugin system has a property Express doesn&apos;t: it&apos;s
      explicit about scope. A plugin runs in its own encapsulation context,
      with its own decorators, its own hooks, and a clear parent-child
      relationship. That sounds academic until you&apos;re trying to add a
      tracing decorator that should only apply to a subset of routes, or a
      database connection that should be exposed only to one plugin tree.
    </p>
    <p>
      In Express, scope is by-convention: middleware applies in the order
      it&apos;s registered, and any handler can stomp on{" "}
      <code>req</code> or <code>res</code>. In Fastify, scope is structural,
      and the framework enforces a clear lifecycle (<code>onRequest</code>,{" "}
      <code>preParsing</code>, <code>preValidation</code>,{" "}
      <code>preHandler</code>, <code>onSend</code>, <code>onResponse</code>),
      which gives you actually-useful places to hook in.
    </p>

    <h2>Async-native, not async-tolerant</h2>
    <p>
      Express predates async/await. It still works with async handlers, but
      the error path requires either a wrapper or careful use of{" "}
      <code>next(err)</code>. Forgetting to propagate an error out of a
      promise inside an Express handler is one of the classic Node bugs:
      the request hangs until the timeout, the client gets a 502, the logs
      say nothing.
    </p>
    <p>
      Fastify is async-native. Throwing from a handler propagates to the
      framework error handler. Promises returned from hooks are awaited.
      You can&apos;t accidentally lose an error, because the framework is
      built around the assumption that handlers return promises.
    </p>

    <h2>The cost: ecosystem and familiarity</h2>
    <p>
      Express has more middleware. Every time you&apos;ve hit a new
      requirement in Express, somebody has already written the package, and
      the README has examples that are seven years old and still work. With
      Fastify, the ecosystem is smaller — well-curated, but smaller — and
      sometimes you have to write a plugin yourself or adapt an Express
      package.
    </p>
    <p>
      The other cost is the learning curve. Fastify&apos;s plugin model is
      a bigger conceptual shift than &quot;an array of middleware.&quot;
      For a team coming from years of Express, this is real friction. New
      services should pay it; legacy services probably should not, unless
      there&apos;s a specific reason.
    </p>

    <h2>When to stay on Express</h2>
    <p>
      A few cases where Express is still the right answer:
    </p>
    <ul>
      <li>
        <strong>The service is small and the team is small.</strong> The
        marginal benefit of Fastify&apos;s structure is proportional to how
        many people are touching the codebase. For a one-person internal
        tool, Express is fine.
      </li>
      <li>
        <strong>You depend on Express-specific middleware.</strong>{" "}
        Authentication libraries, session middleware, weird old metrics
        exporters. If migrating means rewriting three plugins yourself, the
        ROI may not be there.
      </li>
      <li>
        <strong>The service is on its way out.</strong> Don&apos;t modernize
        a codebase you&apos;re going to delete in two quarters.
      </li>
    </ul>

    <h2>When to reach for Fastify</h2>
    <p>
      Default to Fastify for new services, especially when:
    </p>
    <ul>
      <li>
        Multiple teams will touch the service over its lifetime.
      </li>
      <li>
        You want validation, OpenAPI, and structured logging on day one
        rather than as a future cleanup.
      </li>
      <li>
        Throughput actually matters and the bottleneck is plausibly the HTTP
        layer.
      </li>
      <li>
        You&apos;re standardizing a runtime across many services and want
        the framework to encode the conventions.
      </li>
    </ul>

    <h2>The framework you don&apos;t want to think about</h2>
    <p>
      The best web framework in a microservice estate is the one your team
      doesn&apos;t have to think about. Fastify is closer to that ideal than
      Express in 2025, mostly because the conventions it enforces are the
      conventions you&apos;d enforce yourself if you had infinite time. Pay
      the upfront cost of the learning curve once. Get the consistent
      validation, the structured plugins, and the async correctness
      forever.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "Fastify vs. Express in 2025: when the framework actually matters",
  description:
    "Throughput is rarely the bottleneck. The real reasons to default to Fastify for new Node services are validation, plugin scope, and async correctness — encoded in the framework, not opt-in.",
  publishedAt: "2025-10-22",
  readingTime: 8,
  tags: [
    "Node.js",
    "Fastify",
    "Express",
    "TypeScript",
    "Web Frameworks",
  ],
  Body,
};

export default post;
