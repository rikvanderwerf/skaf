"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
class Location extends sequelize_1.Model {
}
exports.Location = Location;
Location.init({
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
}, {
    sequelize: database_1.sequelize
});
exports.LocationAddress = Location.hasOne(address_1.Address, {
    foreignKey: 'address_id'
});
//# sourceMappingURL=location.js.map