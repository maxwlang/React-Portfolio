import { pgpPublicKey } from "@/data/pgpKey";

export const dynamic = "force-static";

export function GET() {
  return new Response(pgpPublicKey, {
    headers: {
      "Content-Type": "application/pgp-keys; charset=utf-8",
      "Content-Disposition": 'inline; filename="maxwlang.asc"',
    },
  });
}
