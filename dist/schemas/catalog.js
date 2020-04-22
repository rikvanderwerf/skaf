"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.catalogSchema = apollo_server_express_1.gql `
    type Catalog implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        products: [Product]!
    }

    input CatalogInput {
        products: [ProductInput]!
    }
`;
//# sourceMappingURL=catalog.js.map