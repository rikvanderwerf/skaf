const { listProducts, createProduct } = require('../models/product.js')
const { UnAuthenticatedError } = require('../lib/errors')

const productResolver = {
	products: async (args) => {
		return await listProducts(args.productInput) || []
	},
	createProduct: async (args, request) => {
		if (!request.isAuthenticated) {
			throw UnAuthenticatedError
		}
        return await createProduct(args.productInput)
	}
}

exports.productResolver = productResolver
