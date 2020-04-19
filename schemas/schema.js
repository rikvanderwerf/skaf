const { authSchema } = require('./auth.js')
const { buildSchema } = require('graphql');
const { retailerSchema } = require('./retailer.js')
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

const rootSchema = `
	schema {
		query: rootQuery
		mutation: rootMutation
	}
`

function concatSchemas() {
	return schema = [
		authSchema,
		retailerSchema, 
		rootMutation, 
		rootQuery, 
		rootSchema, 
		userSchema
	].join(' ')
}

module.exports = buildSchema(concatSchemas())
