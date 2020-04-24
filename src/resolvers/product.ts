import { resolverConfig } from "../lib/authorization"
import { storeFactory } from "../lib/factories/store"
import { productFactory } from "../lib/factories/product"
import { getStoreById } from "../models/store"

export const productResolver = {
	Query: {
		products: resolverConfig('product.list', productFactory, async (_, args, context) => {
			return await context.models.product.list(args.productInput) || []
		})
	},
	Mutation: {
		createProduct: resolverConfig('product.post', productFactory, async (_, args, context) => {
			return await context.models.product.create(args.productInput)
		})
	}
}