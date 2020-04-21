const { gql } = require('apollo-server-express')

const catalogSchema = gql`
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

exports.catalogSchema = catalogSchema

