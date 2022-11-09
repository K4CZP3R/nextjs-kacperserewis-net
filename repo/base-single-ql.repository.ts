import { client, getOneQuery } from "../lib/get-apollo";
import { ISingleRepository } from "./../interfaces/single-repository.iface";
export class BaseSingleQlRepository<T> implements ISingleRepository<T> {
  constructor(
    public rawConverter: (arg0: any) => T,
    public modelName: string,
    public modelStructure: string
  ) {}

  async get(): Promise<T | null> {
    const { data } = await client.query({
      query: getOneQuery(this.modelName, this.modelStructure),
    });
    return this.rawConverter(data[this.modelName].data);
  }

  convertOrNot(data: any): T | null {
    if (data) {
      return this.rawConverter(data);
    }
    return null;
  }
}
