import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// Suppress cascading hydration mismatch warnings caused by third-party scripts (e.g., Google AdSense)
if (typeof window !== "undefined") {
  // 1. Intercept standard console error logs
  const originalError = console.error;
  console.error = (...args) => {
    const errorString = args
      .map((arg) => (typeof arg === "string" ? arg : arg?.message || ""))
      .join(" ");

    if (
      errorString.includes("Hydration failed") ||
      errorString.includes("Minified React error #418") ||
      errorString.includes("Minified React error #423") ||
      errorString.includes("Did not expect server HTML") ||
      errorString.includes("Text content did not match") ||
      errorString.includes("An error occurred during hydration") ||
      errorString.includes("There was an error while hydrating")
    ) {
      return;
    }

    originalError(...args);
  };

  // 2. Intercept uncaught window exceptions thrown by React hydration
  window.addEventListener(
    "error",
    (event) => {
      const message = event?.message || "";
      if (
        message.includes("Hydration failed") ||
        message.includes("Minified React error #418") ||
        message.includes("Minified React error #423") ||
        message.includes("There was an error while hydrating")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
