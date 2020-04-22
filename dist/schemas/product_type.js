"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.productTypeSchema = apollo_server_express_1.gql `
    type ProductType implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
    }

    input ProductTypeInput {
        name: String!
    }
`;
//# sourceMappingURL=product_type.js.map