const retailerSchema = `
	type Retailer {
		id: ID!
		name: String!
	}

	input RetailerInput {
		name: String!
	}
`
	
module.exports = { retailerSchema }
