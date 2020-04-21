const { listProductTypes } = require('../models/product_type.js')

const productTypeResolver = {
    Query: {
       async productTypes(parent, args, context, info) {
            return await listProductTypes(args.productTypeInput) || []
        }
    }
}

exports.productTypeResolver = productTypeResolver
