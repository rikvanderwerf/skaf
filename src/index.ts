import { getUserFromRequestIfLoggedIn } from './middlewares/auth'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { generateModels} from './models/models'
import { resolvers } from './resolvers/resolver'
import { schema } from './schemas/schema'
import { sequelize } from './database/database'
import { addStrainstoDatabase } from './lib/scripts/strain_filler'

const app = express();

app.use(express.json())

sequelize.sync()

// addStrainstoDatabase()

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
        const user = await getUserFromRequestIfLoggedIn(req)
        
        return {
            user: user,
            models: generateModels(user)
        }
    }
})
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
