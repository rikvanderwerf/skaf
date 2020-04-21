const catalogSchema = `
    type Catalog implements BaseSchema {
        id: ID!
		createdAt: String!
		updatedAt: String!
        products: [Product]!
    }

    input CatalogInput {
        products: [Product]!
    }
`;

exports.catalogSchema = catalogSchema

