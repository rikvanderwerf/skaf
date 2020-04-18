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
		retailers: (args) => {
			return retailer.list()
		}
	},
	rootMutation: {
//		createRetailer: (args) => {
//			console.log(retailer.create)
			// const retailer = {
			// 	name: args.retailerInput.name
			// }
//			return retailer.create(args.retailerInput)
	//	}
	}
}

module.exports = { retailerSchema, retailerResolver }
