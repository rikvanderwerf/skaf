const { getUserFromRequestIfLoggedIn } = require('./middlewares/auth.js')
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const { generateModels } = require('./models/models.js')
const { resolvers } = require('./resolvers/resolver')
const { sequelize } = require('./database/database.js')
const { schema } = require('./schemas/schema.js')

const app = express();

app.use(express.json())

sequelize.sync()

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req }) => {
      const user = getUserFromRequestIfLoggedIn(req)

      return { 
          user,
          models: generateModels(user)
      }
    }
})
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
