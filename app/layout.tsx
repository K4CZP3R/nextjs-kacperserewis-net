import Layout from "../components/layout/layout";
import "../styles/globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js + TypeScript Example",
  description: "This is an example of using Next.js with TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
