const { listRetailers, createRetailer } = require('../models/retailer.js')

const retailerResolver = {
	Query: {
		async retailers(parent, args, context, info) {
			return await listRetailers(args.retailerInput) || []
		}
	},
	Mutation: {	
		async createRetailer(parent, args, context, info) {
			return await createRetailer(args.retailerInput)
		}
	}
}

exports.retailerResolver = retailerResolver
