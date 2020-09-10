import { gql } from 'apollo-server-express'

export const catalogItemSchema = gql`
    type CatalogItem implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        description: String!
        storeId: String!
        store: Store!
        productId: String!
        product: Product!
        catalogItemVariants: [CatalogItemVariant!]!
    }

    input CatalogItemInput {
        description: String!
        storeId: String! 
        productId: String!
        catalogItemVariants: [CatalogItemVariantInput!]!
    }
`;

exports.catalogItemSchema = catalogItemSchema 
