import { resolverConfig } from "../lib/authorization"


export const retailerResolver = {
	Query: {
		retailers: resolverConfig('retailer.list', async (_, args, context) => {
			return await context.models.retailer.list(args.retailerInput) || []
		})
	},
	Mutation: {
		createRetailer: resolverConfig('retailer.post', async (_, args, context) => {
			return await context.models.retailer.create(args.retailerInput)
		}),
		updateRetailer: resolverConfig('retailer.put', async (_, args, context) => {
			return await context.models.retailer.put(args.id, args.retailerInput)
		})
	}
}
