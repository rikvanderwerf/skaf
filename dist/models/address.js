"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
class Address extends sequelize_1.Model {
}
exports.Address = Address;
Address.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    streetName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'street_name'
    },
    postalCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'postal_code'
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: database_1.sequelize
});
//# sourceMappingURL=address.js.map