"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const database_1 = require("../database/database");
class Catalog extends sequelize_1.Model {
}
exports.Catalog = Catalog;
Catalog.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    }
}, {
    sequelize: database_1.sequelize
});
Catalog.hasMany(product_1.Product, {
    as: 'products'
});
function getCatalog(catalogInput) {
    return Catalog.findOne({
        where: catalogInput
    });
}
function createCatalog(catalogInput) {
    return Catalog.create(catalogInput);
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