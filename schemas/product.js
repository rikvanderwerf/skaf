const productSchema = `
    type productSchema implements BaseSchema {
        name: String!
        productType: ProductType!
    }

    input ProductInput {
        name: String!
        productType: ProductType
    }
`;

exports.productSchema = productSchema
