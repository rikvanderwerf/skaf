const { authSchema } = require('./auth.js')
const { authResolver } = require('../resolvers/auth.js')
const { makeExecutableSchema } = require('graphql-tools')
const { retailerSchema } = require('./retailer.js')
const { retailerResolver } = require('../resolvers/retailer.js')
const { userSchema } = require('./user.js')
const { userResolver } = require('../resolvers/user.js')

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

const rootSchema = `
	schema {
		query: rootQuery
		mutation: rootMutation
	}
`


const schema = makeExecutableSchema({	
	typeDefs: [
		authSchema,
		retailerSchema, 
		rootMutation, 
		rootQuery, 
		rootSchema, 
		userSchema
	],
	resolvers: [
		authResolver,
		retailerResolver, 
		userResolver
	]
})

module.exports = schema
