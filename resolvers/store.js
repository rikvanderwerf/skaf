const { listStores, createStore } = require('../models/store.js')

const retailerResolver = {
	Query: {
		async stores(parent, args, context, info) {
			return await listStores(args.retailerInput) || []
		}
	},
	Mutation: {
		async createRetailer(parent, args, context, info) {
			return await createStore(args.storeInput)
		}
	}
}

exports.retailerResolver = retailerResolver