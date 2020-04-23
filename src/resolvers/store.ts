import { resolverConfig } from "../lib/authorization"
import { storeFactory } from "../lib/factories/store"


export const storeResolver = {
	Query: {
		store: resolverConfig('store.get', storeFactory, async (_, args, context) => {
			return context.model
		}),
		stores: resolverConfig('store.list', storeFactory, async (_, args, context) => {
			return await context.models.store.list(args.retailerInput) || []
		})
	},
	Mutation: {
		createStore: resolverConfig('store.create', storeFactory, async (_, args, context) => {
			return await context.models.store.create(args.storeInput)
		})
	}
}