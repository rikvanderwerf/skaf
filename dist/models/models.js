"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catalog_1 = require("./catalog");
const user_1 = require("./user");
const product_1 = require("./product");
const product_type_1 = require("./product_type");
const retailer_1 = require("./retailer");
const store_1 = require("./store");
exports.generateModels = (user) => {
    return {
        user: user_1.generateUserModel(user),
        catalog: catalog_1.generateCatalogModel(user),
        product: product_1.generateProductModel(user),
        productType: product_type_1.generateProductTypeModel(user),
        retailer: retailer_1.generateRetailerModel(user),
        store: store_1.generateStoreModel(user)
    };
};
//# sourceMappingURL=models.js.map