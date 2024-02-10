import { cookies } from "next/headers";
import { LangSelect } from "../lang-select";
import ThemeToggle from "../theme-toggle";

export default function Footer() {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "dark";
  return (
    <div className="p-1 flex items-center gap-2">
      <b>Kacper Serewiś 2023</b>
      <ThemeToggle initialValue={theme as "light" | "dark"} />
      <LangSelect />
    </div>
  );
}
