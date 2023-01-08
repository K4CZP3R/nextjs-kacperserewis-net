import { SOCIALS } from "../data/socials";
import { IRepository } from "../interfaces/repository.iface";
import { ISocial } from "../models/social.model";

export class SocialRepository implements IRepository<ISocial> {
    get(id: string): Promise<ISocial | null> {
        return Promise.resolve(SOCIALS.find((social) => social.id === id) || null)
    }
    getAll(): Promise<ISocial[]> {
        return Promise.resolve(SOCIALS);
    }
}