export interface IRepository<T> {
  get(id: string, locale: string): Promise<T | null>;
  getAll(locale: string): Promise<{ id: string; data: T }[]>;
}
