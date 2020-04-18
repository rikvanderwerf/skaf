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
		retailers: () => {
			return retailer.list()
		}
	},
	rootMutation: {
		createRetailer: (_, args) => {
			return retailer.create(args.retailerInput)
		}
	}
}

module.exports = { retailerSchema, retailerResolver }
