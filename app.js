const { ApolloServer, gql } = require('apollo-server-express')
const authMiddleware = require('./middlewares/auth.js')
const express = require('express')
const { resolvers } = require('./resolvers/resolver')
const { sequelize } = require('./database/database.js')
const { schema } = require('./schemas/schema.js')

const app = express();

app.use(express.json())
app.use(authMiddleware)

sequelize.sync()

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const server = new ApolloServer({
    typeDefs: schema,
    resolvers
})
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
