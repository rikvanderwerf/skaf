const { listProductTypes } = require('../models/product_type.js')

const productTypeResolver = {
	productTypes: async (args) => {
        return await listProductTypes(args.productTypeInput) || []
    }
}

exports.productTypeResolver = productTypeResolver
