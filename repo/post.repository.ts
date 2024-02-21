import { IRepository } from "../interfaces/repository.iface";
import { IPost } from "../models/post.model";
import { StrapiRestRepository } from "./strapi-rest.repository";

export class PostRepository
  extends StrapiRestRepository<IPost>
  implements IRepository<IPost>
{
  constructor() {
    super("posts");
  }

  get(id: string, locale: string): Promise<IPost | null> {
    return super.get(id, locale);
  }
  getAll(locale: string): Promise<IPost[]> {
    return super.getAll(locale);
  }
}
