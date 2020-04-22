"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.retailerSchema = apollo_server_express_1.gql `
	type Retailer implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		name: String!
	}

	input RetailerInput {
		name: String!
	}
`;
exports.retailerSchema = exports.retailerSchema;
//# sourceMappingURL=retailer.js.map