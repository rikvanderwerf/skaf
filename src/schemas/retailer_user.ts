import { gql } from 'apollo-server-express'

export const retailerUserSchema = gql`
    type RetailerUser implements BaseSchema {
        userId: ID!
        retailerId: ID!
        role: String
        user: User!
		createdAt: String!
		updatedAt: String!
    }

    input RetailerUserInput {
        userId: ID!
        retailerId: ID!
        role: String
    }
`