"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.authSchema = apollo_server_express_1.gql `
	type Auth {
		userId: ID!
		token: String!
	}

	input AuthInput {
		email: String!
		password: String!
	}
`;
//# sourceMappingURL=auth.js.map