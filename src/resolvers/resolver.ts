import { authResolver } from './auth'
import { productResolver } from './product'
import { productTypeResolver } from './product_type'
import { retailerResolver } from './retailer'
import { storeResolver } from './store'
import { userResolver } from './user'

export const resolvers = [
	authResolver,
	productResolver,
	productTypeResolver,
	retailerResolver,
	storeResolver,
	userResolver
]