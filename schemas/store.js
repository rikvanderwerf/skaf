const storeSchema = `
	type Store implements BaseSchema {
		latitude: String!
		longitude: String!
	}

	input storeInput {
        latitude: String!
		longitude: String!
	}
`
	
exports.storeSchema = storeSchema
