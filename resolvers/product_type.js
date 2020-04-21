const { listProductTypes } = require('../models/product_type.js')

const productTypeResolver = {
    Query: {
        productTypes: async (parent, args, context, info) => {
            return await listProductTypes(args.productTypeInput) || []
        }
    }
}

exports.productTypeResolver = productTypeResolver
