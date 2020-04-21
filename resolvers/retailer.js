const { listRetailers, createRetailer } = require('../models/retailer.js')

const retailerResolver = {
	Query: {
		retailers: async (parent, args, context, info) => {
			return await listRetailers(args.retailerInput) || []
		}
	},
	Mutation: {	
		createRetailer: async (parent, args, context, info) => {
			return await createRetailer(args.retailerInput)
		}
	}
}

exports.retailerResolver = retailerResolver
