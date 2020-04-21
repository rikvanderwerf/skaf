const locationSchema = `
    type Location implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        latitude: Float!
        longitude: Float!
        address: Address
    }

    input locationInput {
        latitude: Float!
        longitude: Float!
    }
`;

exports.locationSchema = locationSchema
