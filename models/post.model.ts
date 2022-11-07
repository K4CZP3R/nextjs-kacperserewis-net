export const POST_DATA_GRAPHQL_CONTENT = `
id
attributes {
  title
  description
  content
  slug
  tags {
    value
  }
}
`


export interface IPost {
    title: string;
    id: string;
    description: string;
    content: string;
    tags: {value:string}[];
    images: any;
    slug: string;
}


export function toPost(raw: any): IPost {
    return {
        id: raw.id,
        title: raw.attributes.title,
        description: raw.attributes.description,
        content: raw.attributes.content,
        tags: raw.attributes.tags,
        images: raw.attributes.images ?? null,
        slug: raw.attributes.slug
    }
}