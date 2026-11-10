import { ImageResponse } from "next/og";

export const alt = "Sudharsan AJ, Product Designer who builds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0e",
          color: "#ededE8",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#8a8a84" }}>
          <span style={{ color: "#c8f23a" }}>~/</span>sudharsan-aj
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 110, lineHeight: 1, letterSpacing: -4, fontWeight: 600 }}>
            Product designer
          </div>
          <div style={{ display: "flex", fontSize: 110, lineHeight: 1, letterSpacing: -4, fontWeight: 600 }}>
            who&nbsp;<span style={{ color: "#c8f23a" }}>builds_</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8a8a84" }}>
          Sudharsan AJ · design → code with AI → ship
        </div>
      </div>
    ),
    size,
  );
}
