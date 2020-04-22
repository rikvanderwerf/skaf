"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const catalog_1 = require("./catalog");
const product_1 = require("./product");
const product_type_1 = require("./product_type");
const retailer_1 = require("./retailer");
const store_1 = require("./store");
const user_1 = require("./user");
exports.resolvers = [
    auth_1.authResolver,
    catalog_1.catalogResolver,
    product_1.productResolver,
    product_type_1.productTypeResolver,
    retailer_1.retailerResolver,
    store_1.storeResolver,
    user_1.userResolver
];
//# sourceMappingURL=resolver.js.map