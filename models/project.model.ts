import { Locale } from "@/locales/consts";

export interface IProject {
  title: string;
  slug: string;
  description: string;
  buttons: { title: string; path: string }[];
  tags: string[];
  locale: Locale;
}
