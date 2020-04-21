const retailerSchema = `
	type Retailer implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		name: String!
	}

	input RetailerInput {
		name: String!
	}
`
	
exports.retailerSchema = retailerSchema
