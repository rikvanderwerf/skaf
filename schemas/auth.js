const authSchema = `
	type Auth {
		userId: ID!
		token: String!
	}

	input AuthInput {
		email: String!
		password: String!
	}
`

module.exports = { authSchema }
