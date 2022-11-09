export const PROJECT_DATA_GRAPHQL_CONTENT = `
id
attributes {
  title
  slug
  description
  buttons {
    title
    path
  }
  tags {
    value
  }
}
`;

export interface IProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  buttons: { title: string; path: string }[];
  tags: { value: string }[];
}

export function toProject(raw: any): IProject {
  return {
    id: raw.id,
    title: raw.attributes.title,
    slug: raw.attributes.slug,
    description: raw.attributes.description,
    buttons: raw.attributes.buttons,
    tags: raw.attributes.tags,
  };
}
