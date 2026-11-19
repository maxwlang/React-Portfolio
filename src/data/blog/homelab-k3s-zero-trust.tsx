import type { BlogPost } from "./types";

const slug = "homelab-k3s-zero-trust";

const Body = () => (
  <>
    <p>
      My homelab is, by some definitions, ridiculous: eleven VLANs, a K3S
      cluster on Proxmox, an HAProxy ingress tier in front of it, ArgoCD
      managing every workload from a private Git repo, and a zero-trust
      firewall posture that forces me to write a rule every time I want one
      machine to talk to another. By other definitions — say, &quot;does it
      run reliably without me touching it for weeks at a time&quot; — it&apos;s
      the most stable computing environment I&apos;ve ever owned. The two
      observations are related.
    </p>
    <p>
      This post is a tour of how the homelab is wired and why each layer
      exists. None of it is novel by itself. The interesting part is how the
      pieces fit together — and what falls out when you commit to running
      production-grade infrastructure on used hardware in a basement.
    </p>

    <h2>The shape: Proxmox at the bottom, K3S on top</h2>
    <p>
      The hypervisor is Proxmox VE. It hosts everything: a TrueNAS storage
      VM, a Plex VM, a few firewall and utility VMs, and the three nodes
      that make up the K3S cluster. K3S is the lightweight Kubernetes
      distribution from Rancher — opinionated, single-binary, fast to bring
      up, and small enough that running a control plane and two agents on
      modest VMs is a reasonable default. The control plane is one node;
      the two agents share workloads, with one of them carrying an NVIDIA
      GPU that&apos;s passed through from Proxmox for whatever ML workload
      is the flavor of the month.
    </p>
    <p>
      The split between Proxmox and K3S matters. Proxmox handles the things
      that don&apos;t want to be containerized — bulk storage, the firewall,
      anything that benefits from a stable IP and direct hardware access.
      K3S handles everything else. The boundary keeps the K3S cluster
      cattle-ish: I can blow away an agent VM and rebuild it from a single
      cloud-init script and a re-join command, and the workloads reschedule
      themselves. The Proxmox VMs that aren&apos;t in K3S are the few pets I
      have left, and I treat them accordingly.
    </p>

    <h2>The network: eleven VLANs and a zero-trust default</h2>
    <p>
      The network is segmented into eleven VLANs, each with its own purpose:
      a trusted LAN, a lab network for development, an IoT network for
      devices I don&apos;t trust, a guest network, a proxy network for the
      ingress tier, a DMZ for public-facing services, a games network for
      game-server workloads, an app network for internal services and
      databases, a management network for infrastructure devices, a separate
      management network for service control panels, and a VoIP network.
      The router enforces the segmentation; the rule of thumb is that nothing
      can talk to anything else unless I&apos;ve written a rule that says it
      can.
    </p>
    <p>
      That sounds excessive until you watch a single compromised IoT light
      fail to reach anything interesting because the IoT VLAN cannot, by
      default, initiate a connection to the LAN. The zero-trust posture
      means every new service comes with a small chunk of firewall config —
      &quot;this thing on this VLAN needs to reach this database on the app
      VLAN on this port&quot; — and the friction of writing that rule is the
      friction that keeps me honest. I cannot accidentally expose a database
      to the IoT network because I have to consciously punch a hole to it.
    </p>
    <p>
      A separate physical network — what I call the FILE network — runs
      direct DAC cables from the storage host to the hypervisors and K3S
      nodes for bulk file traffic. It&apos;s an unrouted private subnet that
      bypasses the VLAN tagging entirely. Backups, NFS mounts, and large
      transfers go over it without competing with the rest of the LAN for
      switch ports or firewall cycles. It costs almost nothing — a handful
      of DAC cables and a couple of extra NICs — and it&apos;s the single
      biggest reason the cluster doesn&apos;t fall over when a backup runs.
    </p>

    <h2>Ingress: HAProxy as the only door</h2>
    <p>
      Public traffic reaches the homelab through Cloudflare and lands on a
      single HAProxy instance on the proxy VLAN. HAProxy is the only
      machine on the public-facing edge that gets to talk to anything
      inside. It does TLS termination (with certificates issued via an
      internal CA for internal services and via Let&apos;s Encrypt for
      public ones), routes by hostname to the right K3S agent, and passes
      the original client IP through with a trusted Cloudflare header check
      so the apps behind it see the real source.
    </p>
    <p>
      Picking HAProxy over an in-cluster ingress controller as the
      outermost layer is deliberate. It means there&apos;s exactly one
      configuration file that describes the public surface of the
      homelab — easy to audit, easy to back up, easy to reason about. The
      K3S cluster has its own internal ingress (Traefik, the K3S default)
      for routing inside the cluster, but the outer door is HAProxy. If the
      cluster is on fire, HAProxy is still up and I can serve a
      maintenance page from it without touching Kubernetes.
    </p>

    <h2>Authentication: one Authentik to rule them</h2>
    <p>
      Every internal service that supports forward-auth sits behind a single
      Authentik instance with three outposts — one per domain family. The
      pattern is: Traefik fronts the service, Traefik&apos;s forward-auth
      middleware asks the appropriate Authentik outpost whether the
      request is authenticated, and the outpost either redirects to the
      login page or stamps the request with the user&apos;s identity headers
      and lets it through.
    </p>
    <p>
      The big win is single sign-on across every internal app — the
      bookmark manager, the recipe manager, the password manager, the
      analytics dashboard, the lot. Log in once, you&apos;re in everywhere.
      The smaller but more important win is that I&apos;ve standardized the
      auth boundary: I never have to think about whether a service&apos;s
      built-in user system is any good. I just turn it off and put the
      service behind Authentik.
    </p>

    <h2>GitOps: ArgoCD as the source of truth</h2>
    <p>
      Every workload in the K3S cluster is described by a YAML file in a
      private Git repo. ArgoCD watches that repo and reconciles the cluster
      to match. The cluster is, in practice, stateless: I can wipe it and
      rebuild it from the Git repo in a few minutes. Secrets are stored in
      the repo encrypted with SOPS and an age key, decrypted by KSOPS in
      the ArgoCD repo-server pod, and never exist in plaintext on disk
      anywhere outside that pod&apos;s memory.
    </p>
    <p>
      Migrating ArgoCD from SSH-based Git access to HTTPS with a
      personal-access token was a small, late-game change that paid for
      itself immediately: SSH host keys are a moving target on a
      self-hosted Forgejo instance, HTTPS isn&apos;t. The whole repo-access
      configuration became one secret instead of three, and I stopped
      getting paged on host-key rotations. Pick the boring option.
    </p>

    <h2>Secrets: SOPS plus age, in the repo</h2>
    <p>
      The SOPS-plus-age combination is the boring, correct choice for
      secrets in a Git-driven homelab. Each secret is a YAML file with
      sensitive values encrypted in place; non-sensitive structure stays
      readable, so diffs are still useful in code review. The age key lives
      on the K3S cluster and on my laptop, and nowhere else. Onboarding a
      new device is one command. Off-boarding one is rotating the key,
      re-encrypting, and pushing — a procedure I&apos;ve practiced once,
      which is one more time than most homelabs ever do.
    </p>

    <h2>What it costs in operator time</h2>
    <p>
      The honest accounting: this took a long time to build. Not because any
      one piece is hard, but because there are a lot of pieces, and getting
      them to cooperate well takes iterations. The payoff is that, on a
      typical week, I touch the homelab to deploy something new, not to fix
      something old. The boring operational work is mostly automated:
      backups happen, certificates renew, ArgoCD reconciles, SOPS decrypts.
      The toil is concentrated in the moments when I&apos;m intentionally
      changing something, which is exactly where I want my attention to be.
    </p>
    <p>
      That&apos;s the whole pitch for treating a homelab like production.
      Not because it has to be — nothing depends on it that a few hours of
      downtime would harm — but because the same disciplines that make
      production sustainable make a homelab sustainable. Zero-trust
      networking means I don&apos;t accidentally expose things. GitOps
      means I can rebuild from scratch. Single sign-on means I don&apos;t
      have a drawer of forgotten passwords. The point of operating a
      homelab seriously isn&apos;t to make it more impressive. It&apos;s to
      make it disappear into the background, so the only time I notice it
      is when I&apos;m using it.
    </p>
  </>
);

const post: BlogPost = {
  slug,
  title: "A homelab that runs itself: K3S, Proxmox, and zero-trust networking",
  description:
    "How an eleven-VLAN, zero-trust homelab is wired together — Proxmox, K3S, HAProxy, ArgoCD, and SOPS — and why production-grade discipline pays off in a basement.",
  publishedAt: "2026-02-18",
  readingTime: 9,
  tags: [
    "Homelab",
    "Kubernetes",
    "K3S",
    "Proxmox",
    "Networking",
    "GitOps",
    "Self-Hosting",
  ],
  Body,
};

export default post;
