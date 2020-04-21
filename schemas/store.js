const storeSchema = `
	type Store implements BaseSchema {
		latitude: String!
		longitude: String!
		location: Location!
	}

	input storeInput {
        latitude: String!
		longitude: String!
		location: Location!
	}
`
	
exports.storeSchema = storeSchema
