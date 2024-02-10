import { Locale } from "../locales/consts";

export interface IPage {
  slug: string;
  title: string;
  subtitle: string;
  extraContent: string;
  locale: Locale;
}
