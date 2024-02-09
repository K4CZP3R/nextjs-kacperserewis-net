import { Locale } from "../locales/consts";

export interface IPost {
  title: string;
  description: string;
  content: string;
  tags: string[];
  images: any;
  slug: string;
  createdAt: string;
  updatedAt: string;
  locale: Locale;
}
