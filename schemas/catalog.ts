const { gql } = require('apollo-server-express')

export const catalogSchema = gql`
    type Catalog implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        products: [Product]!
    }

    input CatalogInput {
        products: [ProductInput]!
    }
`;
