const { gql } = require('apollo-server-express')

const retailerSchema = gql`
	type Retailer implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		name: String!
	}

	input RetailerInput {
		name: String!
	}
`
	
exports.retailerSchema = retailerSchema
