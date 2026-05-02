import { ImageResponse } from "next/og";
import { envs } from "@/core/config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 52%, #14532d 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "14px 22px",
            fontSize: 26,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "#bfdbfe",
          }}
        >
          Mundial Megastore
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#cbd5e1",
          }}
        >
          Loja fisica + e-commerce
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          Informatica, eletronicos e perfumes importados em Ribeirao Preto
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 860,
            fontSize: 30,
            lineHeight: 1.3,
            color: "#cbd5e1",
          }}
        >
          {envs.NEXT_PUBLIC_COMPANY_META_DESCRIPTION}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 26,
          color: "#e2e8f0",
        }}
      >
        <div style={{ display: "flex" }}>{envs.NEXT_PUBLIC_COMPANY_PHONE}</div>
        <div style={{ display: "flex" }}>
          {envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION}
        </div>
      </div>
    </div>,
    size,
  );
}
