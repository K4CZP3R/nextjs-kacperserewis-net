import { ISocial, SOCIAL_DATA_GRAPHQL_CONTENT, toSocial } from '../models/social.model';
import { BaseQlRepository } from './base-ql.repository';
export class SocialQlRepository extends BaseQlRepository<ISocial> {
    constructor() {
        super(toSocial, 'social', SOCIAL_DATA_GRAPHQL_CONTENT)
    }
}