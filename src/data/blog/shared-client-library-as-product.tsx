import type { BlogPost } from "./types";

const slug = "shared-client-library-as-product";

const Body = () => (
  <>
    <p>
      In any microservice estate of meaningful size, there is a small
      collection of cross-cutting concerns that every service has to handle:
      logging, metrics, tracing, error handling, configuration, secrets, the
      Kafka client, the HTTP client, retry policy, feature flags. The naive
      answer is for each team to wire these up themselves with whichever
      libraries they prefer. That works for the first few teams. It collapses
      somewhere around the tenth.
    </p>
    <p>
      The mature answer is a shared client library — a single, well-maintained
      package that every service is expected to use as the foundation for its
      runtime. This post is about why that library is the most important
      service you have, even though it never serves a request.
    </p>

    <h2>The argument</h2>
    <p>
      Pick any cross-cutting concern. Say, distributed tracing. There are a
      few ways an org can adopt it:
    </p>
    <ol>
      <li>
        Each team picks an OpenTelemetry SDK, configures it, instruments
        their code, and ships.
      </li>
      <li>
        A platform team writes a guide and a sample, and asks each team to
        copy the sample.
      </li>
      <li>
        A platform team ships a shared library where{" "}
        <code>import {"{ kafkaProducer }"} from &quot;@org/runtime&quot;</code>{" "}
        gives you a producer that&apos;s already traced, already metricked,
        already error-handled, with sane defaults.
      </li>
    </ol>
    <p>
      Option 1 produces 175 slightly different tracing setups, half of which
      don&apos;t propagate context across Kafka headers because that&apos;s
      easy to miss. Option 2 produces 175 mostly-identical setups that drift
      apart over six months. Option 3 produces one tracing setup that you
      improve in one place. Only option 3 scales linearly with the org.
    </p>

    <h2>What goes in the library</h2>
    <p>
      The temptation is to put everything in the library. Resist it. The
      library has a job: to be the runtime. Things that belong:
    </p>
    <ul>
      <li>
        Logger configuration (structured logs, redaction, sampling, request
        id propagation).
      </li>
      <li>
        Metrics client (with consistent label conventions enforced at the
        type level).
      </li>
      <li>Tracer setup with header propagation across HTTP and Kafka.</li>
      <li>
        HTTP client with retries, timeouts, circuit-breaking, error wrapping.
      </li>
      <li>
        Kafka producer/consumer wrappers with idempotency, schema validation,
        and tracing.
      </li>
      <li>Configuration loading (env, secrets, with type-safe schemas).</li>
      <li>Health check and readiness probe handlers.</li>
      <li>The error-handling framework.</li>
      <li>
        The graceful-shutdown lifecycle (drain in-flight requests, commit
        offsets, close pools).
      </li>
    </ul>
    <p>
      Things that do not belong: business logic, domain models, anything
      specific to a single team&apos;s workload. The library is a runtime,
      not a kitchen sink.
    </p>

    <h2>API design that respects the consumer</h2>
    <p>
      The most important design property of a shared library is that it
      should disappear into a service&apos;s code, not dominate it. A
      service&apos;s <code>main.ts</code> should look like:
    </p>
    <pre>
      <code>{`import { startService } from "@org/runtime";
import { router } from "./router";

await startService({
  name: "billing",
  http: { router },
  kafka: { topics: ["orders.created"], handler: ordersHandler },
});`}</code>
    </pre>
    <p>
      Behind <code>startService</code> is everything: logging, metrics,
      tracing, graceful shutdown, the works. A new service can ship in a
      morning. A regression in an underlying client is a single library bump
      away from being fixed everywhere.
    </p>

    <h2>The hard part: ownership and versioning</h2>
    <p>
      A shared library without an owner is a hazard. Every consumer ends up
      with a slightly different opinion about its contents, nobody has the
      authority to say no to additions, and the library bloats into a
      sprawling thing that nobody fully understands.
    </p>
    <p>
      The library needs:
    </p>
    <ul>
      <li>
        <strong>An owning team.</strong> Real on-call rotation. Real bug
        triage. The library is their product.
      </li>
      <li>
        <strong>A semver discipline.</strong> Breaking changes are rare and
        announced. Most releases are additive. The library&apos;s API is a
        contract with the rest of the org.
      </li>
      <li>
        <strong>A deprecation policy.</strong> When you remove an API, you
        announce it, ship a deprecation warning for at least a quarter, and
        leave migration guidance in the codebase, not just in chat.
      </li>
      <li>
        <strong>Telemetry.</strong> The library knows which version every
        consumer is on, surfaced as a dashboard. Old versions in the field
        are a real artifact, not an abstraction.
      </li>
    </ul>

    <h2>The forking pressure</h2>
    <p>
      The single most dangerous thing that happens to a shared library is
      forking. A team has an unusual requirement, the library doesn&apos;t
      support it, the team copies the relevant module into their service
      &quot;just for now,&quot; and now there are two implementations of the
      Kafka consumer in the org. Six months later there are six. A year
      later, the library&apos;s purpose is gone.
    </p>
    <p>
      Two countermeasures: extension points and a fast yes-or-no for
      contributions. Extension points are the easy part — design the library
      so unusual requirements can be expressed as configuration or callbacks
      rather than forks. The contributions process is harder. The library
      team needs to be willing to merge or reject in days, not months,
      because every week of delay is a vote for a fork.
    </p>

    <h2>Second-order benefits</h2>
    <p>
      The win of a good shared library isn&apos;t the runtime; it&apos;s the
      org-level patterns it enables.
    </p>
    <p>
      A new logging field — say, a tenant id propagated from request
      headers — can be rolled out to every service in the org by bumping a
      single dependency. A new tracing convention is a one-line change.
      Hardening the HTTP client against a specific failure mode is a release.
      Without a shared library, each of these is a quarter-long migration
      project. With one, it&apos;s a normal Tuesday.
    </p>

    <h2>The recruiter version of this story</h2>
    <p>
      If you&apos;re building or maintaining one of these libraries, that&apos;s
      a story worth telling clearly: it sits at the intersection of platform
      engineering, developer experience, and reliability. It&apos;s the rare
      place in a microservice org where one engineer&apos;s good decision
      compounds into hundreds of services without that engineer ever touching
      them again. That kind of leverage is what senior engineering looks
      like, and it&apos;s easy to underplay because the artifact is a
      package, not a product.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "The shared client library is the most important service you have",
  description:
    "Why an internal Node/TypeScript runtime library — logger, metrics, tracer, Kafka and HTTP clients, lifecycle — is the highest-leverage code in a large microservice estate.",
  publishedAt: "2025-07-20",
  readingTime: 9,
  tags: [
    "Platform Engineering",
    "TypeScript",
    "Node.js",
    "Microservices",
    "Developer Experience",
  ],
  Body,
};

export default post;
