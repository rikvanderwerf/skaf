import { gql } from 'apollo-server-express'

export const catalogItemVariantSchema = gql`
    type CatalogItemVariant implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        amount: Float!
        unit: String!
        priceId: String!
        price: Price!
    }

    input CatalogItemVariantInput {
        amount: Float!
        unit: String!
        price: PriceInput! 
    }
`;

exports.catalogItemVariantSchema = catalogItemVariantSchema 
