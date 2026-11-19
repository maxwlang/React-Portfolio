import type { BlogPost } from "./types";

const slug = "idempotency-at-the-work-unit-level";

const Body = () => (
  <>
    <p>
      &quot;Make it idempotent&quot; is one of those phrases that sounds like
      advice and is actually a question. Idempotent at what level? The HTTP
      handler? The database write? The third-party call? In a distributed
      system the wrong answer is &quot;all of them, somehow,&quot; and the
      right answer is almost always &quot;at the smallest unit of work that
      crosses a trust boundary.&quot; This post is about why that distinction
      matters and how to encode it in TypeScript code that&apos;s actually
      maintainable.
    </p>

    <h2>The setup: at-least-once is the default</h2>
    <p>
      Any time a message crosses a network boundary — a Kafka topic, an SQS
      queue, an HTTP retry — you should assume it can arrive more than once.
      Brokers retry. Clients retry. Operators replay. Even &quot;exactly-once
      semantics&quot; in modern brokers only covers the broker hop, not the
      side effects your consumer performs after reading. The realistic mental
      model: every consumer will, eventually, see every message at least
      twice.
    </p>
    <p>
      Once you accept that, the design question becomes: how do I make
      processing the same message twice produce the same observable
      result as processing it once? And the trap is to answer at the wrong
      altitude.
    </p>

    <h2>What &quot;wrong altitude&quot; looks like</h2>
    <p>
      A common first attempt is to deduplicate at the edge: a Bloom filter or
      Redis set in front of the consumer that drops messages it&apos;s seen
      before. This works in development. In production it fails for three
      reasons: the dedupe store has its own consistency story (now you have
      two distributed systems), it doesn&apos;t survive a partition rebalance
      cleanly, and it doesn&apos;t cover replays from the broker if you ever
      need to reprocess history.
    </p>
    <p>
      Another tempting answer is to lean on the database: &quot;we&apos;ll
      use upserts everywhere.&quot; This is closer, but it papers over the
      problem. Upserts are idempotent for the row they touch, but most
      message handlers do more than write one row — they emit downstream
      events, call external APIs, and update audit trails. An upsert tells
      you nothing about whether those side effects already ran.
    </p>

    <h2>The right altitude: the work unit</h2>
    <p>
      The pattern that survives contact with reality is to define a
      <em> unit of work</em> — the complete set of side effects a single
      message produces — and make that unit idempotent as a whole, anchored
      by an <code>operationId</code> derived from the message itself.
    </p>
    <p>
      Concretely, every consumer follows the same shape:
    </p>
    <ol>
      <li>
        Compute a deterministic <code>operationId</code> from the message
        contents. For a domain event, that&apos;s usually the event id; for a
        command, it&apos;s a hash of the command payload.
      </li>
      <li>
        Inside a single database transaction, attempt to insert{" "}
        <code>operationId</code> into a <code>processed_operations</code>{" "}
        table with a unique constraint.
      </li>
      <li>
        If the insert succeeds, perform all side effects within that same
        transaction (or via the outbox pattern for cross-system effects) and
        commit.
      </li>
      <li>
        If the insert fails on the unique constraint, the message has already
        been processed. Acknowledge and move on.
      </li>
    </ol>
    <p>
      That&apos;s the whole pattern. It&apos;s not clever. It&apos;s
      genuinely durable, because the dedupe state lives in the same
      transaction as the side effect, so there&apos;s no window in which one
      can succeed and the other fail.
    </p>

    <h2>The outbox is not optional</h2>
    <p>
      The hard case is when a side effect is a downstream message — say,
      consuming an order event and emitting a billing event. You can&apos;t
      put a Kafka publish inside a SQL transaction. The standard answer is
      the transactional outbox: instead of publishing directly, write the
      outgoing message to an <code>outbox</code> table within the same
      transaction as the dedupe row, and have a separate process that drains
      the outbox to the broker.
    </p>
    <p>
      The drain process can be at-least-once without consequence, because
      the consumer of the downstream event is also doing the work-unit
      idempotency dance. The contract holds end-to-end. There&apos;s a small
      latency cost (single-digit milliseconds in practice) and the operational
      tax of running an outbox drainer, but the correctness payoff is
      enormous: an entire class of &quot;ghost messages&quot; goes away.
    </p>

    <h2>Encoding it in TypeScript</h2>
    <p>
      The temptation is to leave this pattern as a runbook entry that every
      service implements its own way. Resist it. The pattern only works if
      it&apos;s applied uniformly, which means it belongs in a shared
      library. A workable shape:
    </p>
    <pre>
      <code>{`async function handleMessage<T>(
  msg: KafkaMessage<T>,
  handler: (tx: Transaction, payload: T) => Promise<void>,
): Promise<void> {
  const operationId = deriveOperationId(msg);
  await db.transaction(async (tx) => {
    const claimed = await tx.processedOperations.tryInsert(operationId);
    if (!claimed) return;
    await handler(tx, msg.payload);
  });
}`}</code>
    </pre>
    <p>
      Every consumer in the estate uses the same wrapper. New engineers
      don&apos;t have to remember the rules; the rules are the API. And when
      you find a subtle bug — for example, that you also need to record a
      processing timestamp for replay support — you fix it in one place.
    </p>

    <h2>What this buys you</h2>
    <p>
      Three things, in order of how much they matter:
    </p>
    <ol>
      <li>
        <strong>Replays become free.</strong> Re-running a topic from an
        earlier offset, intentionally or after an incident, no longer
        requires a coordinated risk assessment. Side effects don&apos;t
        re-fire. This alone changes how you operate the system.
      </li>
      <li>
        <strong>Rebalances stop being scary.</strong> A consumer rebalance
        that causes a small window of double-delivery is no longer a defect;
        it&apos;s a non-event.
      </li>
      <li>
        <strong>You can have a real conversation about &quot;exactly-once
        semantics&quot;</strong> with a senior engineer or a recruiter, and
        you can describe the actual mechanism rather than waving at a
        feature flag.
      </li>
    </ol>

    <h2>The shape of the lesson</h2>
    <p>
      The unifying idea is that idempotency isn&apos;t a property you sprinkle
      on a system. It&apos;s a discipline you encode at one specific
      altitude — the work unit — and propagate via shared code. Get that
      right, and a fleet of consumers becomes well-behaved by default. Get
      it wrong, and every team will reinvent a slightly broken version of
      the same pattern. I have watched both happen, and the difference, at
      scale, is measured in pages per quarter.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "Idempotency at the work-unit level",
  description:
    "Why message-handler idempotency belongs at the unit of work — anchored by operationId in a SQL transaction — and how to encode it in TypeScript so a whole fleet of consumers gets it right by default.",
  publishedAt: "2025-05-15",
  readingTime: 8,
  tags: [
    "Distributed Systems",
    "Kafka",
    "TypeScript",
    "Idempotency",
    "Event-Driven Architecture",
  ],
  Body,
};

export default post;
