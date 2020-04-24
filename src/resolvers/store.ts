import { resolverConfig } from "../lib/authorization"
import { storeFactory } from "../lib/factories/store"


export const storeResolver = {
	Query: {
		store: resolverConfig('store.get', storeFactory, async (_, args, context) => {
			console.log(context.model.getProducts())
			return context.model
		}),
		stores: resolverConfig('store.list', storeFactory, async (_, args, context) => {
			return await context.models.store.list(args.retailerInput) || []
		}),
		products: async (_, args, context) => {
			return []
		}
	},
	Mutation: {
		createStore: resolverConfig('store.create', storeFactory, async (_, args, context) => {
			return context.models.store.create(args.storeInput)
		}),
		updateStore: resolverConfig('store.put', storeFactory, async (_, args, context) => {
			return context.model.update(args.retailerInput)
		})
	},
	Store: {
		products: async (_, args, context) => {
			return []
		}	
	}
}