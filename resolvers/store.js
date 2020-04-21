const { listStores, createStore } = require('../models/store.js')

const retailerResolver = {
	Query: {
		stores: async (parent, args, context, info) => {
			return await listStores(args.retailerInput) || []
		}
	},
	Mutation: {
		createRetailer: async (parent, args, context, info) => {
			return await createStore(args.storeInput)
		}
	}
}

exports.retailerResolver = retailerResolver