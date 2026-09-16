import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const content = "google.com, pub-3337739847756959, DIRECT, f08c47fec0942fa0\n";
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
