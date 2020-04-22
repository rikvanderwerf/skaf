const productResolver = {
	Query: {
		async products(_, args, context) {
			return await context.models.product.list(args.productInput) || []
		}
	},
	Mutation: {
		async createProduct(_, args, context) {
			return await context.models.product.create(args.productInput)
		}
	}
}

exports.productResolver = productResolver
