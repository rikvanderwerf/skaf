const express = require('express')
const graphqlHTTP = require('express-graphql');

const { buildSchema } = require('graphql');
const { v4 } = require('uuid');

const uuid = v4

const app = express();
const retailers = [];

app.use(express.json())

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
`);

var rootResolver = {
	retailers: () => {
		return retailers; 
	},
	createRetailer: (args) => {
		const retailer = {
			id: uuid(),
			name: args.name
		};
		retailers.push(retailer);
		return retailer;
	}
}


app.use('/graphql', graphqlHTTP({
    schema: schema,
	rootValue: rootResolver,
	graphiql: true,
}));

app.listen(4000)
