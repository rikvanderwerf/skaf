"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.priceSchema = apollo_server_express_1.gql `
    type priceSchema implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        priceInCents: Int!
        currency: String!
    }

    input priceInput {
        priceInCents: Int!
        currency: String!
    }
`;
//# sourceMappingURL=price.js.map