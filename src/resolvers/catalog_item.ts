import { catalogItemFactory } from '../lib/factories/catalog_item'
import { resolverConfig } from '../lib/authorization'
import { CatalogItem } from '../models/catalog_item'
import { Price } from '../models/price'
import { CatalogItemVariant } from '../models/catalog_item_variant'

export const catalogItemResolver = {
    Mutation: {
        createCatalogItem: resolverConfig('catalogItem.post', catalogItemFactory, async (_, args, context) => {
            const catalogItem: CatalogItem = await context.models.catalogItem.create(args.catalogItemInput)
            for (const catalogItemVariant of args.catalogItemInput.catalogItemVariants) {
                const price: Price = await context.models.price.create(catalogItemVariant.price)

                catalogItemVariant['priceId'] = price.id
                catalogItemVariant['catalogItemId'] = catalogItem.id
                const variant: CatalogItemVariant = await context.models.catalogItemVariant.create(catalogItemVariant) 

                catalogItem.addCatalogItemVariant(variant)
            }
            return catalogItem 
        })
    },
    CatalogItem: {
        catalogItemVariants: async(parent: CatalogItem) => {
            return parent.getCatalogItemVariants() || []
        }
    }
}