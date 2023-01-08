import { PAGES } from "../data/page";
import { IRepository } from "../interfaces/repository.iface";
import { IPage } from "../models/page.model";

export class PageRepository implements IRepository<IPage> {

  get(id: string): Promise<IPage | null> {
    return Promise.resolve(PAGES.find((page) => page.slug === id) || null);
  }
  getAll(): Promise<IPage[]> {
    return Promise.resolve(PAGES);
  }
}