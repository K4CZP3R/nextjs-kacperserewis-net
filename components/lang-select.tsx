"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          {getEmojiFlag(current)}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => set("nl")}>
          Dutch {getEmojiFlag("nl")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => set("pl")}>
          Polish {getEmojiFlag("pl")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => set("en")}>
          English {getEmojiFlag("en")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
