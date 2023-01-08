import { POSTS } from "../data/post";
import { IRepository } from "../interfaces/repository.iface";
import { IPost } from "../models/post.model";

export class PostRepository implements IRepository<IPost> {
  get(id: string): Promise<IPost | null> {
    return Promise.resolve(POSTS.find((post) => post.slug === id) || null);
  }
  getAll(): Promise<IPost[]> {
    return Promise.resolve(POSTS);
  }
}