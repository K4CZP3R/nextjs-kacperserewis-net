export interface IRepository<T> {
    get(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
}