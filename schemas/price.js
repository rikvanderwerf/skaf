const priceSchema = `
    type priceSchema implements BaseSchema {
        priceInCents: Int!
        currency: String!
    }

    input priceInputType {
        priceInCents: Int!
        currency: String!
    }
`;

exports.priceSchema = priceSchema
