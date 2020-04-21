const { gql } = require('apollo-server-express')

const locationSchema = gql`
    type Location implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        latitude: Float!
        longitude: Float!
        address: Address
    }

    input LocationInput {
        latitude: Float!
        longitude: Float!
    }
`;

exports.locationSchema = locationSchema
