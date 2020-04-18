const { makeExecutableSchema } = require('graphql-tools')
const { retailerSchema } = require('./retailer.js')
const { retailerResolver } = require('../resolvers/retailer.js')

const rootQuery = `
	type rootQuery {
		retailers(retailerInput: RetailerInput): [Retailer!]!
	}
`

const rootMutation = `
	type rootMutation {
		createRetailer(retailerInput: RetailerInput): Retailer
	}
`

const rootSchema = `
	schema {
		query: rootQuery
		mutation: rootMutation
	}
`


const schema = makeExecutableSchema({	
	typeDefs: [rootSchema, retailerSchema, rootQuery, rootMutation],
	resolvers: [retailerResolver]
})

module.exports = schema
