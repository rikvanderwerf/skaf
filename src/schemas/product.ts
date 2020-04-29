import { gql } from 'apollo-server-express'

export const productSchema = gql`
    type Product implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
        productType: ProductType!
        flavors: [Flavor!]!
        effects: [Effect!]!
    }

    input ProductInput {
        name: String!
        productType: ProductTypeInput
        storeId: String!
    }
`;

exports.productSchema = productSchema
