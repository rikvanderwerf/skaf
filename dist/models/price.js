"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Price = database_1.sequelize.define('price', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        
        allowNull: false,
    },
    priceInCents: {
        type: sequelize_1.DataTypes.INTEGER,
        
        allowNull: false,
        field: 'price_in_cents'
    }
});
//# sourceMappingURL=price.js.map