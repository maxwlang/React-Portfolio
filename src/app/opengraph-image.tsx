import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Maxwell Lang — Senior Software Engineer (TypeScript, React, Node.js)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 32,
            letterSpacing: 6,
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          Maxwell Lang
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          Senior Software Engineer
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 40,
            color: "#cbd5f5",
            maxWidth: 1000,
          }}
        >
          TypeScript · React · Next.js · Node.js
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 26,
            color: "#94a3b8",
          }}
        >
          maxwlang.com — Minneapolis, MN · Available remote
        </div>
      </div>
    ),
    { ...size },
  );
}
