import { ReactNode } from "react";

"use cache"

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
