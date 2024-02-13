import { IRepository } from "@/interfaces/repository.iface";
import { Locale } from "@/locales/consts";

type MultiResponse<T> = {
  data: { id: number; attributes: T }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export class StrapiRestRepository<T> implements IRepository<T> {
  constructor(
    private path: string,
    private baseUrl: string = process.env.API_URL ?? "http://localhost:3000",
    private apiKey: string = process.env.API_KEY ?? "",
  ) {}

  async get(id: string, locale: Locale): Promise<T | null> {
    const res = await fetch(
      `${this.baseUrl}/${this.path}?locale=${locale}&filters[slug][$eq]=${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        cache: "force-cache",
      },
    );
    const json = (await res.json()) as MultiResponse<T>;
    return json.data.length > 0
      ? { ...json.data[0].attributes, id: json.data[0].id }
      : null;
  }

  async getAll(locale: Locale): Promise<T[]> {
    const res = await fetch(`${this.baseUrl}/${this.path}?locale=${locale}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      cache: "force-cache",
    });
    const json = (await res.json()) as MultiResponse<T>;
    return json.data.map((d) => {
      return { ...d.attributes, id: d.id };
    });
  }
}
