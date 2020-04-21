const userSchema = `
	type User implements BaseSchema {
		email: String!
		password: String!
	}

	input UserInput {
		email: String!
		password: String!
	}
`
	
exports.userSchema = userSchema
