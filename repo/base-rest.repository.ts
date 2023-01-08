import { IRepository } from "../interfaces/repository.iface";

export class BaseRestRepository<T> implements IRepository<T> {

    constructor(
        private path: string,
        private baseUrl: string = process.env.API_URL ?? "http://localhost:3000"
    ) {

    }

    async get(id: string): Promise<T | null> {
        // Fetch from the API
        const res = await fetch(`${this.baseUrl}/${this.path}/${id}`);
        return await res.json();
    }
    async getAll(): Promise<T[]> {
        const res = await fetch(`${this.baseUrl}/${this.path}`);
        return await res.json();
    }


}