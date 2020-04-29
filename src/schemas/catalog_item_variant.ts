import { gql } from 'apollo-server-express'

export const catalogItemVariantSchema = gql`
    type cataloItemVariant implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        amount: number!
        unit: String!
        priceId: String!
        price: Price!
    }
`;

exports.catalogItemVariantSchema = catalogItemVariantSchema 
