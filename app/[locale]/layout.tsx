import Layout from "@/components/layout";
import "@/styles/globals.css";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

// Can be imported from a shared config
const locales = ["en", "nl", "pl"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "dark";
  return (
    <html lang={locale} className={theme}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
