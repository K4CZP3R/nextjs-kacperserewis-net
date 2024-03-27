import { IRepository } from "../interfaces/repository.iface";
import { IProject } from "../models/project.model";
import { FileRestRepository } from "./file-rest.repository";

export class ProjectRepository
  extends FileRestRepository<IProject>
  implements IRepository<IProject>
{
  constructor() {
    super("projects");
  }
}
