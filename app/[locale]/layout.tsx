import Layout from "@/components/layout";
import "@/styles/globals.css";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { Bricolage_Grotesque as FontSans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Can be imported from a shared config
const locales = ["en", "nl", "pl"];
const fontsans = FontSans({
  subsets: ["latin"],
  preload: true,
});
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
    <html lang={locale} data-theme={theme} className={fontsans.className}>
      <body>
        <Layout>{children}</Layout>
        <SpeedInsights />
      </body>
    </html>
  );
}
