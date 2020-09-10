import { gql } from 'apollo-server-express'

export const priceSchema = gql`
    type Price implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        priceInCents: Int!
        currency: String!
    }

    input PriceInput {
        priceInCents: Int!
        currency: String!
    }
`;