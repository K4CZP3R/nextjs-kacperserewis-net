import { IRepository } from "../interfaces/repository.iface";
import { ISocial } from "../models/social.model";
import { StrapiRestRepository } from "./strapi-rest.repository";

export class SocialRepository
  extends StrapiRestRepository<ISocial>
  implements IRepository<ISocial>
{
  constructor() {
    super("socials");
  }
  get(id: string): Promise<ISocial | null> {
    return super.get(id, "en");
  }
  getAll(): Promise<ISocial[]> {
    return super.getAll("en");
  }
}
