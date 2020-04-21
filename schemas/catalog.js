const catalogSchema = `
    type Catalog implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        products: [Product]!
    }

    input CatalogInput {
        products: [ProductInput]!
    }
`;

exports.catalogSchema = catalogSchema

