import { resolverConfig } from "../lib/authorization"
import { productFactory } from "../lib/factories/product"

export const productResolver = {
	Query: {
		products: resolverConfig('product.list', productFactory, async (_, args, context) => {
			return await context.models.product.list(args.productInput) || []
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
		flavors: async (parent, args, context) => {
			return parent.getFlavors() || []
		},
		effects: async (parent, args, context) => {
			return parent.getEffects() || []
		} 
	}
}