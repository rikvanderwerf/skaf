const { ApolloServer } = require('apollo-server-express')
const authMiddleware = require('./middlewares/auth.js')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { rootResolver } = require('./resolvers/resolver')
const { sequelize } = require('./database/database.js')
const schema = require('./schemas/schema.js')

const app = express();

app.use(express.json())
app.use(authMiddleware)

sequelize.sync()

const server = new ApolloServer({
    schema
})
server.applyMiddleware({ app })

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: rootResolver,
// 	graphiql: true,
// }))

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
