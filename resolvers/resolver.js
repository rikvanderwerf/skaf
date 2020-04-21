const { authResolver } = require('./auth.js')
const { retailerResolver } = require('./retailer.js')
const { storeResolver } = require('./store.js')
const { userResolver } = require('./user.js')

const rootResolver = {
	...authResolver,
	...retailerResolver,
	...storeResolver,
	...userResolver
}

exports.rootResolver = rootResolver