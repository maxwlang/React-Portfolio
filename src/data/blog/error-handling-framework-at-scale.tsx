import type { BlogPost } from "./types";

const slug = "error-handling-framework-at-scale";

const Body = () => (
  <>
    <p>
      Most error handling in microservice estates is a kind of folk practice:
      one team uses Express middleware, another uses a Fastify error hook, a
      third throws strings, a fourth swallows everything and logs{" "}
      <code>error.message</code>. It works fine when you have ten services
      and one team. It stops working at 175 services and a dozen teams,
      because then errors are how the system communicates, and an
      inconsistent error story makes the system illegible.
    </p>
    <p>
      A few years ago I helped design and ship an org-wide error-handling
      framework that ended up adopted by ten engineering teams. The framework
      itself was not very clever. The interesting part was the design
      decisions that made it adoptable, and the second-order effects of having
      one shared error vocabulary across an org.
    </p>

    <h2>What the framework actually had to do</h2>
    <p>
      Before writing a line of code, we wrote down what we needed errors to
      do — beyond &quot;not crash the process&quot;:
    </p>
    <ol>
      <li>
        <strong>Classify by audience.</strong> A 4xx that a client caused
        looks different to the client, the on-call engineer, and the metrics
        pipeline. They should all see the same incident, framed three ways.
      </li>
      <li>
        <strong>Carry context.</strong> An error from a downstream service
        should arrive at the original caller with the chain of services it
        passed through, not as a stripped-down stack trace from the last hop.
      </li>
      <li>
        <strong>Be safe to log.</strong> No PII in error messages by default.
        Sensitive fields tagged so they get redacted in transit.
      </li>
      <li>
        <strong>Be machine-readable.</strong> A stable error code, not a
        free-text message. Dashboards, alerts, and client SDKs key off the
        code; the message is for humans.
      </li>
      <li>
        <strong>Be cheap to adopt.</strong> Any team that wanted to use the
        framework should be able to wire it in in under an hour, with a
        single-page integration guide.
      </li>
    </ol>

    <h2>The shape we landed on</h2>
    <p>
      The core type was deliberately small. In TypeScript:
    </p>
    <pre>
      <code>{`class AppError extends Error {
  readonly code: string;          // stable, machine-readable
  readonly category: ErrorCategory; // user | system | upstream | unknown
  readonly retryable: boolean;
  readonly cause?: AppError | Error;
  readonly context: Record<string, unknown>; // structured, redactable
  readonly chain: string[];        // service hops this error has visited
}`}</code>
    </pre>
    <p>
      Three details did most of the work. First,{" "}
      <code>code</code> is required and namespaced{" "}
      (<code>billing.invoice.not_found</code>), so two teams couldn&apos;t
      collide on the same string. Second,{" "}
      <code>category</code> drives behavior — user errors return 4xx and
      don&apos;t page; system errors return 5xx and do; upstream errors
      preserve their original code so clients can build retry logic against
      stable identifiers. Third, <code>context</code> is structured, not a
      string template, so the redaction layer can find PII fields by name
      instead of by regex.
    </p>

    <h2>Wire format, not just a class</h2>
    <p>
      The biggest lift was deciding that the error type was a wire format,
      not just a runtime object. Whenever an error crossed a service
      boundary — HTTP, gRPC, a Kafka error topic — it was serialized to a
      stable JSON shape. The receiving service deserialized it back into an
      <code>AppError</code>, appended its own service name to{" "}
      <code>chain</code>, and either re-threw it or wrapped it.
    </p>
    <p>
      That meant on-call engineers could look at any error in any dashboard
      and see: &quot;this started in <code>billing</code>, propagated through{" "}
      <code>orders</code>, surfaced in <code>checkout</code>.&quot;
      They didn&apos;t have to chase logs across three services to assemble
      the story. The story was in the error.
    </p>

    <h2>The adoption strategy</h2>
    <p>
      Building the framework was easy. Getting ten teams to adopt it was the
      actual project. Three things mattered:
    </p>
    <ol>
      <li>
        <strong>Adoption was incremental.</strong> Day one, you could wrap
        existing errors with <code>AppError.wrap(e)</code> at the edge and
        get 80% of the value. Migrating internal throws came later, on the
        team&apos;s schedule.
      </li>
      <li>
        <strong>The framework solved a problem people had.</strong> Before
        the framework, every team was doing its own error logging. Adopting
        the framework meant they could delete their own boilerplate. The
        sales pitch was a delete-PR, not an add-PR.
      </li>
      <li>
        <strong>The framework had a real owner.</strong> One team —
        ours — was on the hook to fix bugs, ship enhancements, and answer
        questions. A library without an owner is a library that calcifies;
        an owned internal library is a product.
      </li>
    </ol>

    <h2>What we got back</h2>
    <p>
      The first-order win was the obvious one: errors became consistent.
      Dashboards stopped lying. Alerts started firing on signal instead of
      noise. Anyone could read any incident timeline without context-switching
      into the affected service.
    </p>
    <p>
      The second-order wins were more interesting. Because errors carried
      structured context, we could build cross-service heatmaps showing which
      operations were failing for which tenants, without instrumenting each
      service individually. Because <code>retryable</code> was a first-class
      attribute, our shared HTTP and Kafka clients could implement smart
      retry policies in one place. Because <code>chain</code> was always
      populated, post-incident reviews stopped wasting the first half-hour
      reconstructing the call graph.
    </p>

    <h2>Things I would do differently</h2>
    <p>
      A few. <strong>Versioning the wire format earlier:</strong> we
      shipped without one and paid a small tax later when we wanted to add
      fields. <strong>Running redaction at serialization, not
      construction:</strong> the latter forces every callsite to think about
      what&apos;s sensitive; the former does it once. <strong>And being
      stricter about <code>code</code> taxonomy from the start:</strong> we
      eventually had to do a large rename pass because early codes drifted.
    </p>

    <h2>The real lesson</h2>
    <p>
      A shared error framework isn&apos;t fundamentally a code project. It&apos;s
      a vocabulary project. The code is small; the win is that everyone in
      the org is now describing failures with the same words, in the same
      shape, with the same retry semantics. That makes the system legible,
      and a legible system is one you can actually operate.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "Designing an error-handling framework adopted by 10+ teams",
  description:
    "What it takes to ship an internal error library in a multi-team microservice org — wire format over class, machine-readable codes, structured context, and incremental adoption.",
  publishedAt: "2025-06-12",
  readingTime: 8,
  tags: [
    "TypeScript",
    "Microservices",
    "Error Handling",
    "Platform Engineering",
    "Developer Experience",
  ],
  Body,
};

export default post;
