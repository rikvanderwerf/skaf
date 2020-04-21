const { listStores, createStore } = require('../models/store.js')

const storeResolver = {
	Query: {
		async stores(parent, args, context, info) {
			return await listStores(args.retailerInput) || []
		}
	},
	Mutation: {
		async createStore(parent, args, context, info) {
			return await createStore(args.storeInput)
		}
	}
}

exports.storeResolver = storeResolver