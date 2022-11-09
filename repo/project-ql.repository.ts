import { gql } from "@apollo/client";
import { client, getByFilter } from "../lib/get-apollo";
import {
  IProject,
  PROJECT_DATA_GRAPHQL_CONTENT,
  toProject,
} from "../models/project.model";
import { BaseQlRepository } from "./base-ql.repository";

export class ProjectQlRepository extends BaseQlRepository<IProject> {
  constructor() {
    super(toProject, "project", PROJECT_DATA_GRAPHQL_CONTENT);
  }

  public async getBySlug(slug: string): Promise<IProject[] | null> {
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
          projects {
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
