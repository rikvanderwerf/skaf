const express = require('express')
const graphqlHTTP = require('express-graphql');

const { buildSchema } = require('graphql')
const { sequelize } = require('./database/database.js');
const retailer = require('./models/retailer.js');

const app = express();

app.use(express.json())
sequelize.sync()

var schema = buildSchema(`
	type Retailer {
		id: ID!
		name: String!
	}

	input RetailerInput {
		name: String!
	}

	type rootQuery {
		retailers: [Retailer!]!	
	}

	type rootMutation {
		createRetailer(retailerInput: RetailerInput): Retailer
	}
	
	schema {
		query: rootQuery
		mutation: rootMutation
	}
`)

var rootResolver = {
	retailers: (args) => {
		return retailer.list()
	},
	createRetailer: (args) => {
		console.log(retailer.create)
		// const retailer = {
		// 	name: args.retailerInput.name
		// }
		return retailer.create(args.retailerInput)
	}
}


app.use('/graphql', graphqlHTTP({
    schema: schema,
	rootValue: rootResolver,
	graphiql: true,
}))

app.listen(4000)
