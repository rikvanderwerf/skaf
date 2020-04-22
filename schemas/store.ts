const { gql } = require('apollo-server-express')

export const storeSchema = gql`
	type Store implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		name: String!
		location: Location
	}

	input storeInput {
        name: String!
		location: LocationInput
	}
`
	
exports.storeSchema = storeSchema
