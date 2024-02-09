import { POSTS } from "../data/post";
import { IRepository } from "../interfaces/repository.iface";
import { IPost } from "../models/post.model";
import { Locale } from "../locales/consts";

export class PostRepository implements IRepository<IPost> {
  get(id: string, locale: Locale): Promise<IPost | null> {
    return Promise.resolve(
      POSTS.find((post) => post.slug === id && post.locale === locale) || null,
    );
  }
  getAll(locale: Locale): Promise<IPost[]> {
    return Promise.resolve(POSTS.filter((post) => post.locale === locale));
  }
}
