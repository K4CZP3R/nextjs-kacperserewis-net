import { PAGES } from "../data/page";
import { IRepository } from "../interfaces/repository.iface";
import { Locale } from "../locales/consts";
import { IPage } from "../models/page.model";

export class PageRepository implements IRepository<IPage> {
  get(id: string, locale: Locale): Promise<IPage | null> {
    return Promise.resolve(
      PAGES.find((page) => page.slug === id && page.locale === locale) || null,
    );
  }
  getAll(locale: Locale): Promise<IPage[]> {
    return Promise.resolve(PAGES.filter((page) => page.locale === locale));
  }
}
