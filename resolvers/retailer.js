const retailer = require('../models/retailer.js')
const { handleDatabaseQueryPromise } = require('./resolver.js')

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

module.exports = { retailerResolver }
