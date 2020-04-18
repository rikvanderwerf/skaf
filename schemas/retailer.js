const retailer = require('../models/retailer.js');
	
const retailerSchema = `
	type Retailer {
		id: ID!
		name: String!
	}

	input RetailerInput {
		name: String!
	}
`

const retailerResolver = {
	rootQuery: {
		retailers: (_, args) => {
			return retailer.list(args.retailerInput)
		}
	},
	rootMutation: {
		createRetailer: (_, args) => {
			return retailer.create(args.retailerInput)
		}
	}
}

module.exports = { retailerSchema, retailerResolver }
