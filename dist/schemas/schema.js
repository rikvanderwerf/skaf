"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const apollo_server_express_1 = require("apollo-server-express");
const auth_1 = require("./auth");
const catalog_1 = require("./catalog");
const location_1 = require("./location");
const price_1 = require("./price");
const product_1 = require("./product");
const product_type_1 = require("./product_type");
const retailer_1 = require("./retailer");
const store_1 = require("./store");
const user_1 = require("./user");
const rootQuery = apollo_server_express_1.gql `
	type Query {
		# auth
		login(authInput: AuthInput): Auth

		# catalog
		catalog(catalogInput: CatalogInput): Catalog!

		# product
		products(productInput: ProductInput): [Product!]!

		# product type
		productTypes(productTypeInput: ProductTypeInput): [ProductType!]!

		# retailer
		retailers(retailerInput: RetailerInput): [Retailer!]!

		# store
		stores(storeInput: storeInput): [Store!]!
	}
`;
const rootMutation = apollo_server_express_1.gql `
	type Mutation {
		# catalog
		createCatalog(catalogInput: CatalogInput): Catalog!

		# product
		createProduct(productInput: ProductInput): Product!

		# retailer
		createRetailer(retailerInput: RetailerInput): Retailer

		# store
		createStore(storeInput: storeInput): Store!

		# user
		createUser(userInput: UserInput): User!
	}
`;
const baseSchema = apollo_server_express_1.gql `
	interface BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
	}
`;
exports.schema = [
    rootMutation,
    rootQuery,
    address_1.addressSchema,
    auth_1.authSchema,
    baseSchema,
    catalog_1.catalogSchema,
    location_1.locationSchema,
    price_1.priceSchema,
    product_1.productSchema,
    product_type_1.productTypeSchema,
    retailer_1.retailerSchema,
    rootMutation,
    rootQuery,
    store_1.storeSchema,
    user_1.userSchema
];
//# sourceMappingURL=schema.js.map