"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.locationSchema = apollo_server_express_1.gql `
    type Location implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        latitude: Float!
        longitude: Float!
        address: Address
    }

    input LocationInput {
        latitude: Float!
        longitude: Float!
    }
`;
//# sourceMappingURL=location.js.map