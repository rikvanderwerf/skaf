const { authResolver } = require('../resolvers/auth.js')
const { retailerResolver } = require('../resolvers/retailer.js')
const { userResolver } = require('../resolvers/user.js')

const rootResolver = {
	...authResolver,
	...retailerResolver,
	...userResolver
}

exports.rootResolver = rootResolver