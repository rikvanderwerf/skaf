import { generateCatalogItemModel } from './catalog_item'
import { generateCatalogItemVariantModel } from './catalog_item_variant'
import { generatePriceModel } from './price'
import { generateProductModel } from './product'
import { generateProductTypeModel } from './product_type'
import { generateRetailerModel } from './retailer'
import { generateRetailerUserModel } from './retailer_users'
import { generateUserModel } from './user'
import { generateStoreModel } from './store'

export const generateModels = (user) => {
    return {
        catalogItem: generateCatalogItemModel(),
        catalogItemVariant: generateCatalogItemVariantModel(),
        store: generateStoreModel(),
        price: generatePriceModel(),
        product: generateProductModel(),
        productType: generateProductTypeModel(),
        retailer: generateRetailerModel(user),
        retailerUser: generateRetailerUserModel(), 
        user: generateUserModel()
    }
}