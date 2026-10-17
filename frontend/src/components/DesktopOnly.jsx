
import { useEffect, useState } from "react";

const MIN_WIDTH = 1024;

function checkDesktop() {
  if (typeof window === "undefined") return false;

  return window.innerWidth >= MIN_WIDTH;
}

function DesktopMessage() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
        background:
          "linear-gradient(145deg, #fffdfa 0%, #faf6f0 55%, #f3e9dc 100%)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "470px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            background: "#f1e3d4",
            color: "#a67f60",
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="13" rx="2" />
            <path d="M8 21h8M12 16v5" />
          </svg>
        </div>

        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "#ad866a",
          }}
        >
          ORU HELLO.
        </span>

        <h1
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 6vw, 38px)",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#725441",
          }}
        >
          A Bigger Screen,
          <br />
          A Better Experience.
        </h1>

        <div
          style={{
            width: "60px",
            height: "1px",
            background: "#d5b18e",
          }}
        />

        <p
          style={{
            margin: 0,
            color: "#947965",
            fontSize: "14px",
            lineHeight: 1.9,
          }}
        >
          This experience is specially designed for
          laptop and desktop screens.
        </p>

        <p
          style={{
            margin: 0,
            color: "#947965",
            fontSize: "14px",
            lineHeight: 1.9,
          }}
        >
          To enjoy the complete story, music, and every
          little surprise with its full beauty and feeling,
          please open this website on a laptop or PC.
        </p>

        <div
          style={{
            width: "60px",
            height: "1px",
            background: "#d5b18e",
            marginTop: "8px",
          }}
        />

        <span
          style={{
            color: "#b08d70",
            fontSize: "10px",
            letterSpacing: "0.15em",
          }}
        >
          ONE HELLO. ONE LITTLE STORY.
        </span>
      </div>
    </main>
  );
}

export default function DesktopOnly({ children }) {
  const [isDesktop, setIsDesktop] = useState(checkDesktop);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(checkDesktop());
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop ? <>{children}</> : <DesktopMessage />;
}
