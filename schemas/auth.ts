const { gql } = require('apollo-server-express')

export const authSchema = gql`
	type Auth {
		userId: ID!
		token: String!
	}

	input AuthInput {
		email: String!
		password: String!
	}
`