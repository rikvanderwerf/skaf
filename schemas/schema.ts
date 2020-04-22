const { addressSchema } = require('./address.js')
const { gql } = require('apollo-server-express')
const { authSchema } = require('./auth.js')
const { catalogSchema } = require('./catalog.js')
const { locationSchema } = require('./location.js')
const { priceSchema } = require('./price.js')
const { productSchema } = require('./product.js')
const { productTypeSchema } = require('./product_type.js')
const { retailerSchema } = require('./retailer.js')
const { storeSchema } = require('./store.js')
const { userSchema } = require('./user.js')

const rootQuery = gql`
	type Query {
		# auth
		login(authInput: AuthInput): Auth

		# catalog
		catalog(catalogInput: CatalogInput): Catalog!

		# product
		products(productInput: ProductInput): [Product!]!

		# product type
		productTypes(productTypeInput: ProductTypeInput): [ProductType!]!

		# retailer
		retailers(retailerInput: RetailerInput): [Retailer!]!
		
		# store
		stores(storeInput: storeInput): [Store!]!
	}
`

const rootMutation = gql`
	type Mutation {
		# catalog
		createCatalog(catalogInput: CatalogInput): Catalog!

		# product
		createProduct(productInput: ProductInput): Product!

		# retailer
		createRetailer(retailerInput: RetailerInput): Retailer
		
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

exports.schema = [
	rootMutation,
	rootQuery,
	addressSchema,
	authSchema,
	baseSchema,
	catalogSchema,
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
