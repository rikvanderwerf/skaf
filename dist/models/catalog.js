"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const database_1 = require("../database/database");
exports.Catalog = database_1.sequelize.define('catalog', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    }
});
exports.Catalog.hasMany(product_1.Product, {
    as: 'products'
});
function getCatalog(catalogInput) {
    return exports.Catalog.findOne({
        where: catalogInput
    });
}
function createCatalog(catalogInput) {
    return exports.Catalog.create(catalogInput);
}
exports.generateCatalogModel = (user) => ({
    get: (catalogInput) => {
        return getCatalog(catalogInput);
    },
    create: (catalogInput) => {
        return createCatalog(catalogInput);
    }
});
//# sourceMappingURL=catalog.js.map