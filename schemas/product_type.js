const productTypeSchema = `
    type ProductType implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        name: String!
    }

    input ProductTypeInput {
        name: String!
    }
`;

exports.productTypeSchema = productTypeSchema
