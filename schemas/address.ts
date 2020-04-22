const { gql } = require('apollo-server-express')

export const addressSchema = gql`
    type Address implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        streetName: String!
        postalCode: String!
        city: String!
        country: String!
    }

    input AddressInput {
        streetName: String!
        postalCode: String!
        city: String!
        country: String!
    }
`