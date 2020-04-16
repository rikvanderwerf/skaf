const express = require('express')
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('gaphql');

const app = express();

app.use(express.json())

app.get('/graphql', graphqlHttp({
    schema: buildSchema(`
	schema {
	    query:  
	    mutation:
	}
    `),
    rootValue: {
	
    }

})

app.listen(3000)
