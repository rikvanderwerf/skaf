const { generateCatalogModel } = require('./catalog.js')
const { generateUserModel } = require('./user.js')
const { generateProductModel } = require('./product.js')
const { generateProductTypeModel } = require('./product_type.js')

const generateModels = (user) => {
    return {
        user: generateUserModel(user),
        catalog: generateCatalogModel(user),
        product: generateProductModel(user),
        productType: generateProductTypeModel(user)
    }
}

exports.generateModels = generateModels