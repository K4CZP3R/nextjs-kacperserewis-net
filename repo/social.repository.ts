import { IRepository } from "../interfaces/repository.iface";
import { ISocial } from "../models/social.model";
import { FileRestRepository } from "./file-rest.repository";

export class SocialRepository
  extends FileRestRepository<ISocial>
  implements IRepository<ISocial>
{
  constructor() {
    super("socials");
  }

  get(id: string): Promise<ISocial | null> {
    return super.get(id, "en");
  }

  getAll(): Promise<{ id: string; data: ISocial }[]> {
    return super.getAll("en");
  }
}
