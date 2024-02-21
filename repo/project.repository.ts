import { IRepository } from "../interfaces/repository.iface";
import { IProject } from "../models/project.model";
import { StrapiRestRepository } from "./strapi-rest.repository";

export class ProjectRepository
  extends StrapiRestRepository<IProject>
  implements IRepository<IProject>
{
  constructor() {
    super("projects");
  }

  get(id: string, locale: string): Promise<IProject | null> {
    return super.get(id, locale);
  }
  getAll(locale: string): Promise<IProject[]> {
    return super.getAll(locale);
  }
}
