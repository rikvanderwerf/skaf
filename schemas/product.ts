import { gql } from 'apollo-server-express'

export const productSchema = gql`
    type Product implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
        productType: ProductType!
    }

    input ProductInput {
        name: String!
        productType: ProductTypeInput
    }
`;

exports.productSchema = productSchema
