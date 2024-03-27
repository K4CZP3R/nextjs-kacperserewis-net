"use client";

import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";

const getEmojiFlag = (locale: string) => {
  switch (locale) {
    case "nl":
      return "🇳🇱";
    case "pl":
      return "🇵🇱";
    case "en":
      return "🇬🇧";
    default:
      return "🌍";
  }
};

export default function LangSelect() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const current = params.locale as string;
  const set = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <details className="dropdown dropdown-top">
      <summary className="btn btn-square btn-outline">
        {getEmojiFlag(current)}
        <span className="sr-only">Toggle theme</span>
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <a onClick={() => set("nl")}>Dutch {getEmojiFlag("nl")}</a>
        </li>
        <li>
          <a onClick={() => set("pl")}>Polish {getEmojiFlag("pl")}</a>
        </li>
        <li>
          <a onClick={() => set("en")}>English {getEmojiFlag("en")}</a>
        </li>
      </ul>
    </details>
  );
}
