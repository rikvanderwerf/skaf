import { getUserFromRequestIfLoggedIn } from './middlewares/auth')
import { ApolloServer, gql } from 'apollo-server-express')
const express from 'express')
import { generateModels } from './models/models')
import { resolvers } from './resolvers/resolver')
import { sequelize } from './database/database')
import { schema } from './schemas/schema')

const app = express();

app.use(express.json())

sequelize.sync()

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
      const user = await getUserFromRequestIfLoggedIn(req)

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
