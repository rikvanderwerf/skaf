import { gql } from 'apollo-server-express'

export const retailerSchema = gql`
	type Retailer implements BaseSchema {
		id: ID!
		name: String!
		stores: [Store!]
		userCreatedId: ID!
		createdAt: String!
		updatedAt: String!
	}

	input RetailerInput {
		name: String!
	}
`

exports.retailerSchema = retailerSchema
