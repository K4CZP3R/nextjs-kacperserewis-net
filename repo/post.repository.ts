import { IRepository } from "../interfaces/repository.iface";
import { IPost } from "../models/post.model";
import { FileRestRepository } from "./file-rest.repository";

export class PostRepository
  extends FileRestRepository<IPost>
  implements IRepository<IPost>
{
  constructor() {
    super("posts");
  }

  async get(id: string, locale: string): Promise<IPost | null> {
    const post = await super.get(id, locale);

    if (post?.contentFile) {
      post.content = await this.readFile(`${post.contentFile}`);
    }

    return post;
  }
}
