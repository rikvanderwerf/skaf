"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./middlewares/auth");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const models_1 = require("./models/models");
const resolver_1 = require("./resolvers/resolver");
const database_1 = require("./database/database");
const schema_1 = require("./schemas/schema");
const app = express_1.default();
app.use(express_1.default.json());
database_1.sequelize.sync();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.schema,
    resolvers: resolver_1.resolvers,
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield auth_1.getUserFromRequestIfLoggedIn(req);
        return {
            user,
            models: models_1.generateModels(user)
        };
    })
});
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
//# sourceMappingURL=app.js.map