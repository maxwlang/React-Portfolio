import type { BlogPost } from "./types";

const slug = "typescript-domain-modeling-discriminated-unions";

const Body = () => (
  <>
    <p>
      The single most common mistake I see in TypeScript codebases — across
      teams, across orgs, across years — is modeling domain state with
      optional fields when the underlying truth is that the state is one of
      a small number of distinct shapes. The result is a type that says
      &quot;maybe this, maybe that, who knows&quot; and code that ends up
      littered with non-null assertions and defensive checks that don&apos;t
      compose.
    </p>
    <p>
      Discriminated unions fix this. Used carefully, they let the type
      system encode &quot;this thing is one of these specific shapes,&quot;
      and let the compiler walk you through every case. Used carelessly,
      they generate a different kind of mess. This post is the version of
      the &quot;just use a tagged union&quot; advice with the parts that
      actually matter at scale.
    </p>

    <h2>The smell</h2>
    <p>
      Imagine an order in a billing system. A naive type:
    </p>
    <pre>
      <code>{`interface Order {
  id: string;
  status: "draft" | "submitted" | "paid" | "refunded" | "canceled";
  submittedAt?: Date;
  paidAt?: Date;
  refundedAt?: Date;
  refundReason?: string;
  cancelReason?: string;
  paymentMethodId?: string;
}`}</code>
    </pre>
    <p>
      Every consumer of this type now has to remember the implicit rules:
      &quot;<code>paidAt</code> is set if status is paid or refunded,{" "}
      <code>refundReason</code> is set if status is refunded,{" "}
      <code>cancelReason</code> is set if status is canceled.&quot; None of
      these rules are encoded in the type. They live in tribal knowledge and
      Slack messages, and they will be violated, and the violations will be
      caught at runtime in production.
    </p>

    <h2>The fix</h2>
    <p>
      Model each status as its own shape, unioned together with a shared
      discriminant:
    </p>
    <pre>
      <code>{`type Order =
  | { status: "draft"; id: string }
  | { status: "submitted"; id: string; submittedAt: Date }
  | {
      status: "paid";
      id: string;
      submittedAt: Date;
      paidAt: Date;
      paymentMethodId: string;
    }
  | {
      status: "refunded";
      id: string;
      submittedAt: Date;
      paidAt: Date;
      paymentMethodId: string;
      refundedAt: Date;
      refundReason: string;
    }
  | { status: "canceled"; id: string; canceledAt: Date; cancelReason: string };`}</code>
    </pre>
    <p>
      Now the rules are the type. <code>paidAt</code> exists if and only if
      the order is paid or refunded — and the compiler can prove it. A
      function that wants to format a refund email no longer has to check
      whether <code>refundReason</code> is defined; the input type guarantees
      it.
    </p>
    <pre>
      <code>{`function formatRefundEmail(order: Order & { status: "refunded" }): string {
  return \`Refund for \${order.id}: \${order.refundReason}\`;
}`}</code>
    </pre>

    <h2>Exhaustive switches as the contract</h2>
    <p>
      The second payoff is exhaustiveness. A switch on the discriminant
      narrows the type in each branch, and a small helper turns missing
      branches into compile errors:
    </p>
    <pre>
      <code>{`function summarize(order: Order): string {
  switch (order.status) {
    case "draft": return "draft";
    case "submitted": return "awaiting payment";
    case "paid": return "paid";
    case "refunded": return \`refunded: \${order.refundReason}\`;
    case "canceled": return \`canceled: \${order.cancelReason}\`;
    default: return assertNever(order);
  }
}

function assertNever(x: never): never {
  throw new Error(\`unreachable: \${JSON.stringify(x)}\`);
}`}</code>
    </pre>
    <p>
      Now, when product adds a new status — say, <code>disputed</code> —{" "}
      <em>every</em> place that switches on order status fails to compile
      until it&apos;s updated. The compiler becomes a checklist. You can
      ship that change confidently because the type system is doing the
      work no human review process reliably does.
    </p>

    <h2>Where it goes wrong</h2>
    <p>
      Three failure modes worth naming, because I have made each at least
      once.
    </p>
    <p>
      <strong>Reaching for <code>as</code>.</strong> The moment you start
      writing <code>order as Order &amp; {"{ status: \"paid\" }"}</code> to
      &quot;just get past&quot; the type system, you&apos;re done. You&apos;re
      lying to the compiler. The cure is to model your access patterns as
      narrowing functions:
    </p>
    <pre>
      <code>{`function isPaid(order: Order): order is Order & { status: "paid" } {
  return order.status === "paid";
}`}</code>
    </pre>
    <p>
      <strong>Discriminants that aren&apos;t actually discriminating.</strong>{" "}
      If two variants share the same discriminant value (say, two
      &quot;error&quot; cases with different shapes), the compiler can&apos;t
      narrow. Use a more specific tag (<code>type: &quot;not_found&quot;</code>{" "}
      vs <code>type: &quot;permission_denied&quot;</code>), not a generic
      one.
    </p>
    <p>
      <strong>Premature unions.</strong> Not every type needs to be a tagged
      union. If a value is genuinely a record with a few optional fields and
      no state machine — say, a UI form&apos;s draft state — forcing a
      union on it is busywork. Reach for unions when you&apos;re modeling
      states with mutually exclusive shapes.
    </p>

    <h2>The wire is part of the contract</h2>
    <p>
      Tagged unions are easy on the consumer; they&apos;re harder on the
      producer. When you serialize an order to JSON, you need to make sure
      the discriminant is always present. When you deserialize, you need to
      validate that the shape matches one of the variants. Schema validation
      libraries that understand discriminated unions (Zod, Valibot,
      io-ts) make this clean. A bare <code>JSON.parse</code> followed by an{" "}
      <code>as Order</code> is not validation; it&apos;s an assertion.
    </p>
    <p>
      In practice, that means treating the type and the schema as a single
      source of truth — define the schema, derive the type — so that
      whatever data your service ingests, you&apos;ve actually checked it
      against the union before the compiler starts narrowing.
    </p>

    <h2>The lesson</h2>
    <p>
      Discriminated unions aren&apos;t a TypeScript trick. They&apos;re a
      modeling discipline borrowed from ML-family languages and they work
      because they encode something domain experts already know: this thing
      is in one of these states, and the things that are true about it
      depend on which state it&apos;s in. When the type matches the domain,
      most of the defensive code in your service simply stops needing to
      exist.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "Domain modeling with discriminated unions in TypeScript",
  description:
    "Stop modeling state machines as records full of optional fields. Discriminated unions and exhaustive switches let the compiler enforce the rules your team keeps in tribal knowledge.",
  publishedAt: "2025-09-03",
  readingTime: 7,
  tags: [
    "TypeScript",
    "Domain Modeling",
    "Type Systems",
    "Code Quality",
  ],
  Body,
};

export default post;
