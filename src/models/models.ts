import { generateCatalogModel } from './catalog'
import { generateUserModel } from './user'
import { generateProductModel } from './product'
import { generateProductTypeModel } from './product_type'
import { generateRetailerModel } from './retailer'
import { generateStoreModel } from './store'

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