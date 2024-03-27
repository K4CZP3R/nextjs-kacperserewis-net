import { IRepository } from "../interfaces/repository.iface";

import { IPage } from "../models/page.model";
import { FileRestRepository } from "./file-rest.repository";
import { StrapiRestRepository } from "./strapi-rest.repository";

export class PageRepository
  extends FileRestRepository<IPage>
  implements IRepository<IPage>
{
  constructor() {
    super("pages");
  }
}
