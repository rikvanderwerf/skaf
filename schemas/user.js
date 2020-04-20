const userSchema = `
	type User {
		id: ID!
		email: String!
		password: String!
	}

	input UserInput {
		email: String!
		password: String!
	}
`
	
module.exports = { userSchema }
