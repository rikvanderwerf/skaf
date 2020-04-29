import { resolverConfig } from "../lib/authorization"
import { productFactory } from "../lib/factories/product"
import { Product } from "../models/product"

export const productResolver = {
	Query: {
		products: resolverConfig('product.list', productFactory, async (_, {productInput = {}, pageSize, lastPageKey}, context) => {
			return await context.models.product.list(productInput, pageSize, lastPageKey) || []
		})
	},
	Mutation: {
		createProduct: resolverConfig('product.post', productFactory, async (_, args, context) => {
			const product = await context.models.product.create(args.productInput)
			if (args.productInput.storeId) {
				await product.addStore(args.productInput.storeId)
			}
			return product
		})
	},
	Product: {
		flavors: async (parent: Product) => {
			return parent.getFlavors() || []
		},
		effects: async (parent: Product) => {
			return parent.getEffects() || []
		} 
	}
}