export const INDEX_PAGE_DATA_GRAPHQL_CONTENT = `
attributes {
    title
    subtitle
    extraContent
}`

export interface IIndexPage {
    title: string;
    subtitle: string;
    extraContent: string;
}

export function toIndexPage(raw: any): IIndexPage {
    return {
        title: raw.attributes.title,
        subtitle: raw.attributes.subtitle,
        extraContent: raw.attributes.extraContent
    }
}