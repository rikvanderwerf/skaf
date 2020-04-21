const { listProducts, createProduct } = require('../models/product.js')

const productResolver = {
	Query: {
		products: async (parent, args, context, info) => {
			return await listProducts(args.productInput) || []
		}
	},
	Mutation: {
		createProduct: async (parent, args, context, info) => {parent, args, context, info
			return await createProduct(args.productInput)
		}
	}
}

exports.productResolver = productResolver
