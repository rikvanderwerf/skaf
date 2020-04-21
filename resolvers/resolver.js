const { authResolver } = require('./auth.js')
const { productTypeResolver } = require('./product_type.js')
const { retailerResolver } = require('./retailer.js')
const { storeResolver } = require('./store.js')
const { userResolver } = require('./user.js')

const rootResolver = {
	...authResolver,
	...productTypeResolver,
	...retailerResolver,
	...storeResolver,
	...userResolver
}

exports.rootResolver = rootResolver