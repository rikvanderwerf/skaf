export const retailerResolver = {
	Query: {
		async retailers(_, args, context) {
			return await context.models.retailer.list(args.retailerInput) || []
		}
	},
	Mutation: {
		async createRetailer(_, args, context) {
			return await context.models.retailer.create(args.retailerInput)
		}
	}
}