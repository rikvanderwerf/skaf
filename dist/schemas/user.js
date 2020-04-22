"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.userSchema = apollo_server_express_1.gql `
	type User implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		email: String!
		password: String!
	}

	input UserInput {
		email: String!
		password: String!
	}
`;
//# sourceMappingURL=user.js.map