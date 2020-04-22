"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.addressSchema = apollo_server_express_1.gql `
    type Address implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        streetName: String!
        postalCode: String!
        city: String!
        country: String!
    }

    input AddressInput {
        streetName: String!
        postalCode: String!
        city: String!
        country: String!
    }
`;
//# sourceMappingURL=address.js.map