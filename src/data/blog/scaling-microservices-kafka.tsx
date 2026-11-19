import type { BlogPost } from "./types";

const slug = "scaling-microservices-kafka";

const Body = () => (
  <>
    <p>
      A few years into operating a 175-service architecture that pushes more
      than a billion ingress and three billion egress messages a year on Apache
      Kafka, the lessons that mattered most were almost never the ones in the
      conference talks. They were the small, undramatic engineering choices we
      made early — and the much more dramatic ones we were forced to make
      after we got those early choices wrong. This post is the version I wish
      someone had handed me on day one: a working set of patterns for keeping
      a fleet of TypeScript microservices honest as the message volume climbs.
    </p>

    <h2>1. Partitioning is a product decision, not an ops decision</h2>
    <p>
      The single most consequential choice you make about a Kafka topic is the
      partition key, and it is almost always made by whoever wrote the
      producer first — usually under deadline pressure, usually without a lot
      of thought. That is fine when traffic is small. It becomes catastrophic
      at the high tens of thousands of messages per second, when one
      &quot;hot&quot; partition (a single popular tenant, a single chatty
      device, a single power user) starves out everyone else and your p99
      latency goes from milliseconds to minutes.
    </p>
    <p>
      The pattern that survived contact with reality: treat partition keys as
      part of the topic&apos;s public contract, document them, and design them
      around fairness rather than convenience. For multi-tenant workloads we
      moved away from raw{" "}
      <code>tenantId</code> keys and toward composite keys like{" "}
      <code>tenantId:entityId</code>, with a documented expectation that any
      tenant exceeding a fraction of overall volume gets its own dedicated
      sub-topic. That sounds heavy-handed until you watch a single 10x tenant
      take down a shared topic for the first time.
    </p>

    <h2>2. Exactly-once is a story you tell yourself; idempotency is real</h2>
    <p>
      Kafka&apos;s exactly-once semantics are real, but they are also narrow:
      they cover the producer-to-broker hop and transactional reads/writes
      between Kafka topics. They do not cover the database you write to after
      consuming, the third-party API you call, or the email you send. The
      moment your consumer reaches outside Kafka, you are back in
      at-least-once territory whether you like it or not.
    </p>
    <p>
      The cheapest, most durable answer is to make every consumer idempotent
      at the work-unit level. Concretely: derive a deterministic{" "}
      <code>operationId</code> from the message contents (or carry one
      explicitly), and have the consumer record &quot;I have processed{" "}
      <code>operationId</code> X&quot; in the same transaction as the side
      effect it produces. Replays then become free. We retired an entire class
      of incident — &quot;duplicate event after rebalance&quot; — by enforcing
      this pattern in a shared consumer library and rejecting any service that
      tried to opt out at code review.
    </p>

    <h2>3. Schemas are load-bearing</h2>
    <p>
      In a 175-service estate, every message that crosses a topic boundary is
      a contract between two teams who probably will not talk to each other
      this quarter. The temptation, especially in a TypeScript shop, is to
      lean on the language: &quot;we&apos;ll just publish a type, consumers
      can import it.&quot; This works for a year and then quietly explodes,
      because deploys are not coordinated, and a producer that adds a required
      field on Tuesday will silently break a consumer that does not redeploy
      until Friday.
    </p>
    <p>
      Use a schema registry. Pick one — Confluent Schema Registry, Apicurio,
      or roll your own thin layer over JSON Schema if you must — and enforce
      backward compatibility at publish time, not at runtime. Treat schema
      changes as versioned API changes: additive only by default,
      breaking changes via a new topic version, with an explicit dual-publish
      window. The discipline cost is small. The cost of skipping it is a
      midnight rollback because somebody renamed a field.
    </p>

    <h2>4. Consumer groups are the unit of failure, not services</h2>
    <p>
      A common mistake in early microservice estates is to treat every service
      as the unit of operational concern: pager rotations, dashboards, and
      SLOs all keyed off the service name. In a Kafka world, that is the
      wrong granularity. The thing that actually fails is the consumer
      group — a specific service consuming a specific topic with specific
      lag, specific commit cadence, and specific rebalance behavior.
    </p>
    <p>
      We standardized on a per-consumer-group dashboard with four signals:
      lag, processing latency, commit rate, and rebalance frequency. Every
      consumer group also got a paging SLO on lag. This sounds excessive, and
      yes, it produces a lot of dashboards. It also means that when something
      goes wrong, the on-call engineer has the exact telemetry they need
      open in front of them within seconds, and they do not have to know
      anything about the upstream service to triage.
    </p>

    <h2>5. Backpressure beats buffering</h2>
    <p>
      The default failure mode of a slow consumer is to fall behind. The
      tempting fix is to scale it up, add a buffer, or raise the consumer
      timeout. The honest fix is usually to ask the producer to slow down — or
      to acknowledge that the system is overloaded and shed load explicitly.
    </p>
    <p>
      In practice this looks like rate-limiting at the producer side based on
      observed consumer lag, with a feedback loop running on a 10-second
      timer. When downstream lag exceeds a threshold, the producer drops to a
      slower publish cadence; when lag clears, it ramps back up. The
      important thing is that the producer is the right place to apply
      backpressure, because it is the only component that can choose to do
      less work without violating someone&apos;s contract. Trying to apply
      backpressure at the consumer means dropping or delaying messages other
      teams already consider committed — a much more expensive conversation.
    </p>

    <h2>6. Observability before optimization</h2>
    <p>
      Every performance investigation in a Kafka system eventually becomes a
      tracing investigation. A message lands in a topic, fans out to three
      consumers, one of which republishes to two more topics, one of which
      hits an external API, and now you are trying to explain why the
      end-to-end latency went up 40%. Without distributed tracing — propagated
      through Kafka headers — this is detective work. With it, it is a query.
    </p>
    <p>
      Adopt a tracing standard early (OpenTelemetry is the obvious answer in
      2025) and put the propagation in your shared producer/consumer library
      so no individual service has to think about it. The investment pays for
      itself the first time you find a regression in one service by looking
      at a span on another. It pays for itself again when a recruiter asks
      you, in an interview, how you would debug a complex distributed system,
      and you can answer with specifics.
    </p>

    <h2>7. The shared library is the most important service you have</h2>
    <p>
      In a fleet this size, the difference between a healthy estate and a
      sprawling one is whether there is a shared, well-maintained, well-typed
      Kafka client library that every service is expected to use. That
      library is where you encode the patterns above: idempotent commits,
      schema-validated produce calls, traced spans, structured logging, and
      sane defaults for retries and timeouts. It is also where you encode the
      patterns you have not figured out yet, because a single library is the
      only place a 175-service estate can adopt a new practice in a
      reasonable timeframe.
    </p>
    <p>
      Treat that library as a first-class internal product. Version it.
      Document it. Have a real owner. Resist the urge to let every team fork
      its own copy &quot;just for this one case,&quot; because every fork is
      a future incident.
    </p>

    <h2>The meta-lesson</h2>
    <p>
      The patterns above are not exotic. None of them require a clever
      algorithm or a novel framework. What they require is the willingness to
      treat operability as a first-class engineering concern from the
      beginning, instead of something you bolt on after the third pager
      incident. A microservice architecture at this scale will magnify every
      shortcut you took on day one. The good news is that it will also
      magnify every careful decision — and a small set of careful decisions,
      consistently applied, is the difference between a system that scales
      with the business and one that gets in the way.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "Scaling 175+ microservices to 1B+ Kafka messages a year",
  description:
    "Hard-won patterns for running a large fleet of TypeScript microservices on Kafka — partitioning, idempotency, schema evolution, backpressure, and observability.",
  publishedAt: "2025-04-01",
  readingTime: 9,
  tags: [
    "Kafka",
    "Microservices",
    "TypeScript",
    "Distributed Systems",
    "Observability",
    "Event-Driven Architecture",
  ],
  Body,
};

export default post;
