import { IRepository } from "@/interfaces/repository.iface";
import path from "path";
import fsPromises from "fs/promises";
import { LocaleData } from "@/models/locale-data.model";

export class FileRestRepository<T> implements IRepository<T> {
  constructor(private basePath: string) {}
  async readFile(filePath: string): Promise<string> {
    const fullPath = path.join(process.cwd(), "data", this.basePath, filePath);
    const content = await fsPromises.readFile(fullPath, "utf-8");

    return content;
  }

  private async readJsonFromFile<T>(filePath: string): Promise<T> {
    const content = await this.readFile(filePath);
    return JSON.parse(content) as T;
  }

  async get(id: string, locale: string): Promise<T | null> {
    const jsonData = await this.readJsonFromFile<LocaleData<T>>(`${id}.json`);

    if (Object.keys(jsonData).includes(locale)) {
      return jsonData[locale];
    }
    return null;
  }

  async getAll(locale: string): Promise<{ id: string; data: T }[]> {
    const jsonData = await this.readJsonFromFile<string[]>(`_all.json`);

    const all: { id: string; data: T }[] = [];

    for (const file of jsonData) {
      const data = await this.readJsonFromFile<LocaleData<T>>(`${file}.json`);
      if (Object.keys(data).includes(locale)) {
        all.push({
          id: file,
          data: data[locale],
        });
      }
    }

    return all;
  }
}
