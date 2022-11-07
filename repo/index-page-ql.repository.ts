import { IIndexPage, toIndexPage, INDEX_PAGE_DATA_GRAPHQL_CONTENT } from "../models/index-page.model";
import { BaseSingleQlRepository } from "./base-single-ql.repository";

export class IndexPageQlRepository extends BaseSingleQlRepository<IIndexPage> {
    constructor() {
        super(toIndexPage, 'indexPage', INDEX_PAGE_DATA_GRAPHQL_CONTENT)
    }

}