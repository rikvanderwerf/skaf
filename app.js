const express = require('express')
const graphqlHTTP = require('express-graphql');

const { buildSchema } = require('graphql')
const { v4 } = require('uuid');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://login_role:password@postgresql_db:5432/postgres')


const uuid = v4

const app = express();
const retailers = [];

app.use(express.json())

function testDatabase() {

	sequelize
		.authenticate()
		.then(() => {
			console.log("database connection success!")
		}).catch(err => {
			console.log("database connection failed :(")
		});
}


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
		testDatabase();
		console.log("KKKK");
		return [];
	},
	createRetailer: (args) => {
		const retailer = {
			id: uuid(),
			name: args.retailerInput.name
		};
		retailers.push(retailer);
		console.log("KK");
		console.log(retailer);
		return retailer;
	}
}


app.use('/graphql', graphqlHTTP({
    schema: schema,
	rootValue: rootResolver,
	graphiql: true,
}));

app.listen(4000)
