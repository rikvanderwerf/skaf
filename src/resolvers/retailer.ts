import { resolverConfig } from "../lib/authorization"
import { retailerFactory } from "../lib/factories/retailer"

export const retailerResolver = {
	Query: {
		retailer: resolverConfig('retailer.get', retailerFactory, async (_, args, context) => {
			return context.model
		}),
		retailers: resolverConfig('retailer.list', retailerFactory, async (_, args, context) => {
			return await context.models.retailer.list(args.retailerInput) || []
		})
	},
	Mutation: {
		createRetailer: resolverConfig('retailer.post', retailerFactory, async (_, args, context) => {
			return await context.models.retailer.create(args.retailerInput)
		}),
		updateRetailer: resolverConfig('retailer.put', retailerFactory, async (_, args, context) => {
			return context.model.update(args.retailerInput)
		})
	}
}
