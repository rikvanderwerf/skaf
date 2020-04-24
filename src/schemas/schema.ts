import { addressSchema } from './address'
import { gql } from 'apollo-server-express'
import { authSchema } from './auth'
import { locationSchema } from './location'
import { priceSchema } from './price'
import { productSchema } from './product'
import { productTypeSchema } from './product_type'
import { retailerSchema } from './retailer'
import { storeSchema } from './store'
import { userSchema } from './user'

const rootQuery = gql`
	type Query {
		# auth
		login(authInput: AuthInput): Auth

		# product
		products(productInput: ProductInput): [Product!]!

		# product type
		productTypes(productTypeInput: ProductTypeInput): [ProductType!]!

		# retailer
		retailer(id: ID): Retailer!
		retailers(retailerInput: RetailerInput): [Retailer!]!

		# store
		store(id: ID): Store!
		stores(storeInput: storeInput): [Store!]!
	}
`

const rootMutation = gql`
	type Mutation {
		# product
		createProduct(productInput: ProductInput): Product!

		# retailer
		createRetailer(retailerInput: RetailerInput): Retailer
		updateRetailer(id: ID, retailerInput: RetailerInput): Retailer

		# store
		createStore(storeInput: storeInput): Store!

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
	rootMutation,
	rootQuery,
	addressSchema,
	authSchema,
	baseSchema,
	locationSchema,
	priceSchema,
	productSchema,
	productTypeSchema,
	retailerSchema,
	rootMutation,
	rootQuery,
	storeSchema,
	userSchema
]
