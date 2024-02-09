import { getStaticParams } from "@/locales/server";
import Layout from "../../components/layout/layout";
import "../../styles/globals.css";

import { Metadata } from "next";

export function generateStaticParams() {
  return getStaticParams();
}

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
