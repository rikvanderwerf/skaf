const catalogSchema = `
    type Catalog implements BaseSchema {
        products: [Product]!
    }

    input CatalogInput {
        products: [Product]!
    }
`;

exports.catalogSchema = catalogSchema

