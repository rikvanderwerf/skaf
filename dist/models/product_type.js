"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
class ProductType extends sequelize_1.Model {
}
exports.ProductType = ProductType;
ProductType.init({
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
}, {
    sequelize: database_1.sequelize
});
ProductType.belongsTo(ProductType, {
    as: 'parent',
    foreignKey: 'product_type_parent_id'
});
function listProductTypes(productTypeInput) {
    return ProductType.findAll({
        where: productTypeInput
    });
}
exports.generateProductTypeModel = (user) => ({
    list: (productTypeInput) => {
        listProductTypes(productTypeInput);
    }
});
//# sourceMappingURL=product_type.js.map