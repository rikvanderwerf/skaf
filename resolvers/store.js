const storeResolver = {
	Query: {
		async stores(_, args, context) {
			return await context.models.store.list(args.retailerInput) || []
		}
	},
	Mutation: {
		async createStore(_, args, context) {
			return await context.models.store.create(args.storeInput)
		}
	}
}

exports.storeResolver = storeResolver