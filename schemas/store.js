const storeSchema = `
	type Store implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		latitude: String!
		longitude: String!
		location: Location!
	}

	input storeInput {
        latitude: String!
		longitude: String!
		location: LocationInput!
	}
`
	
exports.storeSchema = storeSchema
