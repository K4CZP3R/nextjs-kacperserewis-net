import { Locale } from "@/locales/consts";
import { PROJECTS } from "../data/projects";
import { IRepository } from "../interfaces/repository.iface";
import { IProject } from "../models/project.model";

export class ProjectRepository implements IRepository<IProject> {
  get(id: string, locale: Locale): Promise<IProject | null> {
    return Promise.resolve(
      PROJECTS.find(
        (project) => project.slug === id && project.locale === locale
      ) || null
    );
  }
  getAll(locale: Locale): Promise<IProject[]> {
    return Promise.resolve(
      PROJECTS.filter((project) => project.locale === locale)
    );
  }
}
