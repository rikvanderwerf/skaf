const { listRetailers, createRetailer } = require('../models/retailer.js')

const retailerResolver = {
	Query: {
		async retailers(parent, args, context, info) {
			console.log("000")
			return await listRetailers(args.retailerInput) || []
		}
	},
	Mutation: {	
		async createRetailer(parent, args, context, info) {
			console.log("******")
			return await createRetailer(args.retailerInput)
		}
	}
}

exports.retailerResolver = retailerResolver
