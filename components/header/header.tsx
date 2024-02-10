import Link from "next/link";
import { getSiteName } from "../../lib/get-site-name";
import { Button } from "../ui/button";

import styles from "./header.module.css";
import ThemeToggle from "../theme-toggle";
import { cookies } from "next/headers";
import { LangSelect } from "../lang-select";
export default function Header() {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "dark";
  return (
    <div className={styles.container}>
      <Button asChild>
        <Link href={"/"}>{getSiteName("")}</Link>
      </Button>
    </div>
  );
}
