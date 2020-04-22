"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.productSchema = apollo_server_express_1.gql `
    type Product implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
        productType: ProductType!
    }

    input ProductInput {
        name: String!
        productType: ProductTypeInput
    }
`;
exports.productSchema = exports.productSchema;
//# sourceMappingURL=product.js.map