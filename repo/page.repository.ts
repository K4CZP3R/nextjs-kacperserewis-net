import { IRepository } from "../interfaces/repository.iface";
import { Locale } from "../locales/consts";
import { IPage } from "../models/page.model";
import { StrapiRestRepository } from "./strapi-rest.repository";

export class PageRepository
  extends StrapiRestRepository<IPage>
  implements IRepository<IPage>
{
  constructor() {
    super("pages");
  }

  get(id: string, locale: Locale): Promise<IPage | null> {
    return super.get(id, locale);
  }
  getAll(locale: Locale): Promise<IPage[]> {
    return super.getAll(locale);
  }
}
