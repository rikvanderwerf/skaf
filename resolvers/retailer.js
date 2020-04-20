const { listRetailers, createRetailer } = require('../models/retailer.js')
const { UnAuthenticatedError } = require('../lib/errors')

const retailerResolver = {
	retailers: async (args) => {
		return await listRetailers(args.retailerInput) || []
	},
	createRetailer: async (args, request) => {
		if (!request.isAuthenticated) {
			throw UnAuthenticatedError
		}
		return await createRetailer(args.retailerInput)
	}
}

module.exports = { retailerResolver }
