import { gql } from 'apollo-server-express'

export const effectSchema = gql`
    type Effect implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        type: String!
        effect: String!
    }
`;

exports.effectSchema = effectSchema
