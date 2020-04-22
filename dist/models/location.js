"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.Location = database_1.sequelize.define('location', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    latitude: {
        type: sequelize_1.DataTypes.DECIMAL,
        
    },
    longitude: {
        type: sequelize_1.DataTypes.DECIMAL,
        
    }
});
exports.LocationAddress = exports.Location.hasOne(address_1.Address, {
    foreignKey: 'address_id'
});
//# sourceMappingURL=location.js.map