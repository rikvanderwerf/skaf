import { gql } from 'apollo-server-express'

export const productTypeSchema = gql`
    type ProductType implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
    }

    input ProductTypeInput {
        name: String!
    }
`;