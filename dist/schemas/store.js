"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.storeSchema = apollo_server_express_1.gql `
	type Store implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		name: String!
		location: Location
	}

	input storeInput {
        name: String!
		location: LocationInput
	}
`;
exports.storeSchema = exports.storeSchema;
//# sourceMappingURL=store.js.map