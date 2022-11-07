import { ApolloClient, DocumentNode, gql, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: process.env.CMS_GRAPHQL,
    cache: new InMemoryCache(),
    headers: {
        authorization: `${process.env.CMS_TOKEN}`,
    },
});


export function getByFilter(modelName: string, key: string, data: string): DocumentNode {
    return gql`
        query Get${modelName}ByFilter($value: String!) {
            ${modelName}s(filters: { ${key}: {eq: $value }}) {
                data {
                    ${data}
                }
            }
        }

    `;
}

export function getOneQuery(modelName: string, data: string): DocumentNode {
    return gql`
    query Get${modelName}{
        ${modelName} {
            data {
                ${data}
            }
        }
    }`
}

export function getByIdQuery(modelName: string, data: string): DocumentNode {
    return gql`
    query Get${modelName}($id: ID!) {
        ${modelName.toLowerCase()}(id: $id) {
            data {
                ${data}
            }
        }
    }
    `
}
export function getAllQuery(modelName: string, data: string): DocumentNode {
    return gql`
    query Get${modelName}s {
        ${modelName.toLowerCase()}s {
            data {
                ${data}
            }
        }
    }
    `
}