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
		retailers(retailerInput: RetailerInput): [Retailer!]!
		login(authInput: AuthInput): Auth
	}
`

const rootMutation = gql`
	type Mutation {
		createRetailer(retailerInput: RetailerInput): Retailer
		createUser(userInput: UserInput): User
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
