import { gql } from 'apollo-server-express'

export const catalogItemSchema = gql`
    type catalogItem implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        description: String!
        storeId: String!
        store: Store!
        productId: String!
        product: Product!
        catalogItemVariants: [catalogItemVariant!]!
    }
`;

exports.catalogItemSchema = catalogItemSchema 
