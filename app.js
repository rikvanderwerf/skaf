const authMiddleware = require('./middlewares/auth.js')
const express = require('express')
const graphqlHTTP = require('express-graphql');

const { sequelize } = require('./database/database.js');
const schema = require('./schemas/schema.js');

const app = express();

app.use(express.json())
app.use(authMiddleware)
sequelize.sync()

app.use('/graphql', graphqlHTTP({
    schema: schema,
	graphiql: true,
}))

app.listen(4000)
