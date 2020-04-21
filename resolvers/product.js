const { listProducts, createProduct } = require('../models/product.js')

const productResolver = {
	Query: {
		async products(parent, args, context, info) {
			return await listProducts(args.productInput) || []
		}
	},
	Mutation: {
		async createProduct(parent, args, context, info) {
			return await createProduct(args.productInput)
		}
	}
}

exports.productResolver = productResolver
