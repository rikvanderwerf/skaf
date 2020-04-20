const locationSchema = `
    type Location implements BaseSchema {
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
