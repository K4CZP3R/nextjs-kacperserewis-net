import { PROJECTS } from "../data/projects";
import { IRepository } from "../interfaces/repository.iface";
import { IProject } from "../models/project.model";

export class ProjectRepository implements IRepository<IProject> {
  get(id: string): Promise<IProject | null> {
    return Promise.resolve(PROJECTS.find((project) => project.slug === id) || null);
  }
  getAll(): Promise<IProject[]> {
    return Promise.resolve(PROJECTS);
  }
}