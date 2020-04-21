const { listProductTypes } = require('../models/product_type.js')

const productTypeResolver = {
    Query: {
       async productTypes(_, args, context) {
            return await context.models.productType.list(args.productTypeInput) || []
        }
    }
}

exports.productTypeResolver = productTypeResolver
