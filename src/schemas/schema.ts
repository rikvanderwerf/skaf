import { addressSchema } from './address'
import { gql } from 'apollo-server-express'
import { authSchema } from './auth'
import { catalogItemSchema } from './catalog_item'
import { catalogItemVariantSchema } from './catalog_item_variant'
import { locationSchema } from './location'
import { priceSchema } from './price'
import { productSchema } from './product'
import { productTypeSchema } from './product_type'
import { retailerSchema } from './retailer'
import { retailerUserSchema } from './retailer_user'
import { storeSchema } from './store'
import { userSchema } from './user'
import { effectSchema } from './effect'
import { flavorSchema } from './flavor'

const rootQuery = gql`
	type Query {
		# auth
		login(authInput: AuthInput): Auth

		# product
		products(productInput: ProductInput, pageSize: Int = 20, lastPageKey: ID): [Product!]!

		# product type
		productTypes(productTypeInput: ProductTypeInput): [ProductType!]!

		# retailer
		retailer(id: ID): Retailer!
		retailers(retailerInput: RetailerInput): [Retailer!]!

		# store
		store(id: ID): Store!
		stores(storeInput: StoreInput): [Store!]!
	}
`

const rootMutation = gql`
	type Mutation {
		# catalog item
		createCatalogItem(catalogItemInput: CatalogItemInput): CatalogItem!

		# product
		createProduct(productInput: ProductInput): Product!

		# retailer
		createRetailer(retailerInput: RetailerInput): Retailer!
		updateRetailer(id: ID, retailerInput: RetailerInput): Retailer!

		# store
		createStore(storeInput: StoreInput): Store!
		updateStore(id: ID, storeInput: StoreInput): Store!

		# user
		createUser(userInput: UserInput): User!
	}
`

const baseSchema = gql`
	interface BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
	}
`

export const schema = [
	addressSchema,
	authSchema,
	catalogItemSchema,
	catalogItemVariantSchema,
	baseSchema,
	effectSchema,
	flavorSchema,
	locationSchema,
	priceSchema,
	productSchema,
	productTypeSchema,
	retailerSchema,
	retailerUserSchema,
	rootMutation,
	rootQuery,
	storeSchema,
	userSchema
]
