import { gql } from 'apollo-server-express'

export const retailerSchema = gql`
	type Retailer implements BaseSchema {
		id: ID!
		name: String!
		stores: [Store!]
		createdAt: String!
		updatedAt: String!
	}

	input RetailerInput {
		name: String!
	}
`