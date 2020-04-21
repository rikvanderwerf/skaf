const productSchema = `
    type Product implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
        productType: ProductType!
    }

    input ProductInput {
        name: String!
        productType: ProductType
    }
`;

exports.productSchema = productSchema
