import { gql } from "@apollo/client";
import { client, getByFilter } from "../lib/get-apollo";
import { IPost, POST_DATA_GRAPHQL_CONTENT, toPost } from "../models/post.model";
import { BaseQlRepository } from "./base-ql.repository";
export class PostQlRepository extends BaseQlRepository<IPost> {
  constructor() {
    super(toPost, "post", POST_DATA_GRAPHQL_CONTENT);
  }

  public async getBySlug(slug: string): Promise<IPost[] | null> {
    const { data } = await client.query({
      query: getByFilter(this.modelName, "slug", this.modelStructure),
      variables: {
        value: slug,
      },
    });
    return data[this.modelNamePlural].data.map((raw: any) =>
      this.rawConverter(raw)
    );
  }

  public async getSlugs(): Promise<string[]> {
    const { data } = await client.query({
      query: gql`
        query {
          posts {
            data {
              attributes {
                slug
              }
            }
          }
        }
      `,
    });
    return data[this.modelNamePlural].data.map(
      (raw: any) => raw.attributes.slug
    );
  }
}
