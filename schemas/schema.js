const { authSchema } = require('./auth.js')
const { buildSchema } = require('graphql');
const { priceSchema } = require('./price.js')
const { productSchema } = require('./product.js')
const { productTypeSchema } = require('./productType.js')
const { retailerSchema } = require('./retailer.js')
const { storeSchema } = require('./store.js')
const { userSchema } = require('./user.js')


const rootQuery = `
	type rootQuery {
		retailers(retailerInput: RetailerInput): [Retailer!]!
		login(authInput: AuthInput): Auth
	}
`

const rootMutation = `
	type rootMutation {
		createRetailer(retailerInput: RetailerInput): Retailer
		createUser(userInput: UserInput): User
	}
`

const baseSchema = `
	interface BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
	}
`

const rootSchema = `
	schema {
		query: rootQuery
		mutation: rootMutation
	}
`

function concatSchemas() {
	return schema = [
		authSchema,
		baseSchema,
		priceSchema,
		productSchema,
		productTypeSchema,
		retailerSchema, 
		rootMutation, 
		rootQuery, 
		rootSchema, 
		storeSchema,
		userSchema
	].join(' ')
}

module.exports = buildSchema(concatSchemas())
