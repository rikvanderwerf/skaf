"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.ProductType = database_1.sequelize.define('productType', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
});
exports.ProductType.belongsTo(exports.ProductType, {
    as: 'parent',
    foreignKey: 'product_type_parent_id'
});
function listProductTypes(productTypeInput) {
    return exports.ProductType.findAll({
        productTypeInput
    });
}
exports.generateProductTypeModel = (user) => ({
    list: (productTypeInput) => {
        listProductTypes(productTypeInput);
    }
});
//# sourceMappingURL=product_type.js.map