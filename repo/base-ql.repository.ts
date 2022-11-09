import { client, getAllQuery, getByIdQuery } from "../lib/get-apollo";
import { IRepository } from "./../interfaces/repository.iface";
export class BaseQlRepository<T> implements IRepository<T> {
  public get modelNamePlural(): string {
    return this.modelName + "s";
  }
  constructor(
    public rawConverter: (arg0: any) => T,
    public modelName: string,
    public modelStructure: string
  ) {}
  async get(id: string): Promise<T | null> {
    try {
      const { data } = await client.query({
        query: getByIdQuery(this.modelName, this.modelStructure),
        variables: {
          id: id,
        },
      });
      return this.rawConverter(data[this.modelNamePlural].data);
    } catch (e: unknown) {
      console.error(JSON.stringify(e));
      return null;
    }
  }
  async getAll(): Promise<T[]> {
    try {
      const { data } = await client.query({
        query: getAllQuery(this.modelName, this.modelStructure),
      });
      return data[this.modelNamePlural].data.map((raw: any) =>
        this.rawConverter(raw)
      );
    } catch (e: unknown) {
      console.error(JSON.stringify(e));
      return [];
    }
  }
}
