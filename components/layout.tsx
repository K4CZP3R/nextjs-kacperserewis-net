import { getSiteName } from "@/lib/get-site-name";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "dark";

  const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
    ssr: false,
  });
  const LangSelect = dynamic(() => import("@/components/lang-select"), {
    ssr: false,
  });
  return (
    <div className="flex h-dvh flex-col items-center justify-between p-2.5">
      <div className="flex items-center">
        <Link href={"/"}>
          <button className="btn btn-ghost text-xl">{getSiteName("")}</button>
        </Link>
      </div>
      <main className="max-w-3xl">{children}</main>

      <div className="flex items-center gap-2 p-1">
        <b>Kacper Serewiś 2023</b>
        <LangSelect />
        <ThemeToggle initialValue={theme as "light" | "dark"} />
      </div>
    </div>
  );
}
