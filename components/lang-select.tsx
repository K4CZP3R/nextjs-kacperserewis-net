"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";

export const getEmojiFlag = (locale: string) => {
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

export function LangSelect() {
  const current = useCurrentLocale();
  const set = useChangeLocale();
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
