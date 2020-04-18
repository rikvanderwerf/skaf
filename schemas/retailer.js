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

function handleDatabaseQueryPromise(promise) {
	return promise
		.then(result => {
			return result 
		}).catch(err => {
			throw err
		})
}

const retailerResolver = {
	rootQuery: {
		retailers: (_, args) => {
			return handleDatabaseQueryPromise(
				retailer.list(args.retailerInput)
			)
		}
	},
	rootMutation: {
		createRetailer: (_, args) => {
			return handleDatabaseQueryPromise(
				retailer.create(args.retailerInput)
			)
		}
	}
}

module.exports = { retailerSchema, retailerResolver }
