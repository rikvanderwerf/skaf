import { resolverConfig } from "../lib/authorization"
// import { RetailerFactory } from "../lib/factories/retailer"


export const retailerResolver = {
	Query: {
		retailers: resolverConfig('retailer.list', async (_, args, context) => {
			return await context.models.retailer.list(args.retailerInput) || []
		})
	}
}
	// Mutation: {
	// 	async createRetailer(_, args, context) {
	// 		return await context.models.retailer.create(args.retailerInput)
	// 	}
	// }