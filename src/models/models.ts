import { generateCatalogItemModel } from './catalog_item'
import { generateCatalogItemVariantModel } from './catalog_item_variant'
import { generateUserModel } from './user'
import { generatePriceModel } from './price'
import { generateProductModel } from './product'
import { generateProductTypeModel } from './product_type'
import { generateRetailerModel } from './retailer'
import { generateStoreModel } from './store'

export const generateModels = (user) => {
    return {
        catalogItem: generateCatalogItemModel(),
        catalogItemVariant: generateCatalogItemVariantModel(),
        store: generateStoreModel(),
        user: generateUserModel(),
        price: generatePriceModel(),
        product: generateProductModel(),
        productType: generateProductTypeModel(),
        retailer: generateRetailerModel(user)
    }
}