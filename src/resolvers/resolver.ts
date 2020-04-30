import { authResolver } from './auth'
import { catalogItemResolver } from './catalog_item'
import { productResolver } from './product'
import { productTypeResolver } from './product_type'
import { retailerResolver } from './retailer'
import { retailerUserResolver } from './retailer_user'
import { storeResolver } from './store'
import { userResolver } from './user'

export const resolvers = [
	authResolver,
	catalogItemResolver,
	productResolver,
	productTypeResolver,
	retailerResolver,
	retailerUserResolver,
	storeResolver,
	userResolver
]