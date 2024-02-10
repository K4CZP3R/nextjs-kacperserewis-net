import { IRepository } from "../interfaces/repository.iface";
import { IPost } from "../models/post.model";
import { Locale } from "../locales/consts";
import { StrapiRestRepository } from "./strapi-rest.repository";

export class PostRepository
  extends StrapiRestRepository<IPost>
  implements IRepository<IPost>
{
  constructor() {
    super("posts");
  }

  get(id: string, locale: Locale): Promise<IPost | null> {
    return super.get(id, locale);
  }
  getAll(locale: Locale): Promise<IPost[]> {
    return super.getAll(locale);
  }
}
