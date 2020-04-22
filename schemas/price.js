const { gql } = require('apollo-server-express')

const priceSchema = gql`
    type priceSchema implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        priceInCents: Int!
        currency: String!
    }

    input priceInput {
        priceInCents: Int!
        currency: String!
    }
`;

exports.priceSchema = priceSchema
