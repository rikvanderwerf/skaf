const retailerSchema = `
	type Retailer implements BaseSchema {
		name: String!
	}

	input RetailerInput {
		name: String!
	}
`
	
exports.retailerSchema = retailerSchema
