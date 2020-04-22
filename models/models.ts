const { generateCatalogModel } = require('./catalog.js')
const { generateUserModel } = require('./user.js')
const { generateProductModel } = require('./product.js')
const { generateProductTypeModel } = require('./product_type.js')
const { generateRetailerModel } = require('./retailer.js')
const { generateStoreModel } = require('./store.js')

export const generateModels = (user) => {
    return {
        user: generateUserModel(user),
        catalog: generateCatalogModel(user),
        product: generateProductModel(user),
        productType: generateProductTypeModel(user),
        retailer: generateRetailerModel(user),
        store: generateStoreModel(user)
    }
}