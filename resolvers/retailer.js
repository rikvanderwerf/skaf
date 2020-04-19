const Retailer = require('../models/retailer.js')
const { UnAuthenticatedError } = require('../lib/errors')

const retailerResolver = {
	retailers: async (args) => {
		return await Retailer.list(args.retailerInput) || []
	},
	createRetailer: async (args, request) => {
		if (!request.isAuthenticated) {
			throw UnAuthenticatedError
		}
		return await retailer.create(args.retailerInput)
	}
}

module.exports = { retailerResolver }
