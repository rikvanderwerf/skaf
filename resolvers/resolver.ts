const { authResolver } = require('./auth.js')
const { catalogResolver } = require('./catalog.js')
const { productResolver } = require('./product.js')
const { productTypeResolver } = require('./product_type.js')
const { retailerResolver } = require('./retailer.js')
const { storeResolver } = require('./store.js')
const { userResolver } = require('./user.js')

export const resolvers = [
	authResolver,
	catalogResolver,
	productResolver,
	productTypeResolver,
	retailerResolver,
	storeResolver,
	userResolver
]