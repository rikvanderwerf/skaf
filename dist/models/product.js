"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const price_1 = require("./price");
const product_type_1 = require("./product_type");
const database_1 = require("../database/database");
const user_1 = require("./user");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize
});
exports.ProductPrice = Product.hasOne(price_1.Price, {
    foreignKey: 'price_id'
});
exports.ProductProductType = Product.hasOne(product_type_1.ProductType, {
    foreignKey: 'product_type_id'
});
function createProduct(productInput) {
    return Product.create(productInput);
}
function listProducts(productInput) {
    return Product.findAll({
        where: productInput
    });
}
function getProduct(productInput) {
    return user_1.User.findOne({
        where: productInput
    });
}
exports.generateProductModel = (user) => ({
    list: (productInput) => {
        return listProducts(productInput);
    },
    get: (productInput) => {
        return getProduct(productInput);
    },
    create: (productInput) => {
        return createProduct(productInput);
    }
});
//# sourceMappingURL=product.js.map