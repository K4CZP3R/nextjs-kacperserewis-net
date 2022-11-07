export interface ISingleRepository<T> {
    get(): Promise<T | null>;
}