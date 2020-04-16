const express = require('express')
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(express.json())

var schema = buildSchema(`
	type rootQuery {
		retailers: [String!]!	
	}

	type rootMutation {
		createRetailer(name: String): String
	}
	
	schema {
		query: rootQuery
		mutation: rootMutation
	}
`);

var rootResolver = {
	retailers: () => {
		return ['skafshop']; 
	},
	createRetailer: (args) => {
		const retailerName = args.name;
		return retailerName
	}
}


app.use('/graphql', graphqlHTTP({
    schema: schema,
	rootValue: rootResolver,
	graphiql: true,
}));

app.listen(4000)
