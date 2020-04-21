const priceSchema = `
    type priceSchema implements BaseSchema {
        priceInCents: Int!
        currency: String!
    }

    input priceInput {
        priceInCents: Int!
        currency: String!
    }
`;

exports.priceSchema = priceSchema
