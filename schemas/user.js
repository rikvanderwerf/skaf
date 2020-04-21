const userSchema = `
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
`
	
exports.userSchema = userSchema
