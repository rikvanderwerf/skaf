const { makeExecutableSchema } = require('graphql-tools')
const { retailerSchema, retailerResolver } = require('./retailer.js')

const rootQuery = `
	type rootQuery {
		retailers: [Retailer!]!
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



