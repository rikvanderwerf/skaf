const addressSchema = `
    type Address implements BaseSchema {
        streetName: String!
        postalCode: String!
        city: String!
        country: String!
    }

    input AddressInput {
        streetName: String!
        postalCode: String!
        city: String!
        country: String!
    }
`;

exports.addressSchema = addressSchema
