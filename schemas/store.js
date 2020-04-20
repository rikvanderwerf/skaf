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
	
module.exports = { storeSchema }
