const retailer = require('../models/retailer.js')
const { handleDatabaseQueryPromise } = require('./resolver.js')

const retailerResolver = {
	rootQuery: {
		retailers: (_, args) => {
			return handleDatabaseQueryPromise(
				retailer.list(args.retailerInput)
			) || []
		}
	},
	rootMutation: {
		createRetailer: (obj, args, context, info) => {
			console.log(obj)	
			console.log(context)
			console.log(info)
			console.log(obj)
			return handleDatabaseQueryPromise(
				retailer.create(args.retailerInput)
			)
		}
	}
}

module.exports = { retailerResolver }
