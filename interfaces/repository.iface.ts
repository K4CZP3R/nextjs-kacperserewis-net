import { Locale } from "../locales/consts";

export interface IRepository<T> {
  get(id: string, locale: Locale): Promise<T | null>;
  getAll(locale: Locale): Promise<T[]>;
}
