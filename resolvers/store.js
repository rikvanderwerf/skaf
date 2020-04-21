const { listStores, createStore } = require('../models/store.js')
const { UnAuthenticatedError } = require('../lib/errors')

const retailerResolver = {
	stores: async (args) => {
		return await listStores(args.retailerInput) || []
	},
	createRetailer: async (args, request) => {
		if (!request.isAuthenticated) {
			throw UnAuthenticatedError
		}
        return await createStore(args.storeInput)
	}
}

exports.retailerResolver = retailerResolver