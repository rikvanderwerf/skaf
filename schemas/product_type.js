const productTypeSchema = `
    type ProductType implements BaseSchema {
        name: String!
    }

    input ProductTypeInput {
        name: String!
    }
`;

exports.productTypeSchema = productTypeSchema
