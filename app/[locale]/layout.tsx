import { getStaticParams } from "@/locales/server";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { cookies } from "next/headers";

export function generateStaticParams() {
  return getStaticParams();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "dark";
  return (
    <html lang="en" className={theme}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
