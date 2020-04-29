import { gql } from 'apollo-server-express'

export const flavorSchema = gql`
    type Flavor implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
    }
`;

exports.flavorSchema = flavorSchema 
