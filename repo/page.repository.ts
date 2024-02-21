import { IRepository } from "../interfaces/repository.iface";

import { IPage } from "../models/page.model";
import { StrapiRestRepository } from "./strapi-rest.repository";

export class PageRepository
  extends StrapiRestRepository<IPage>
  implements IRepository<IPage>
{
  constructor() {
    super("pages");
  }

  get(id: string, locale: string): Promise<IPage | null> {
    return super.get(id, locale);
  }
  getAll(locale: string): Promise<IPage[]> {
    return super.getAll(locale);
  }
}
