export const SOCIAL_DATA_GRAPHQL_CONTENT = `
id
attributes {
    name
    username
    url
}
`
export interface ISocial {
    id: string;
    name: string;
    username: string;
    url: string;
}

export function toSocial(raw: any): ISocial {
    return {
        id: raw.id,
        name: raw.attributes.name,
        username: raw.attributes.username,
        url: raw.attributes.url
    }
}
