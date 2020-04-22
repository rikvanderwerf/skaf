"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
class Retailer extends sequelize_1.Model {
}
exports.Retailer = Retailer;
Retailer.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userCreatedId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        field: "user_created_id",
    }
}, {
    sequelize: database_1.sequelize
});
// const acl = (retailer)
function createRetailer(retailerInput) {
    return Retailer.create(retailerInput);
}
function getRetailer(retailerInput) {
    return Retailer.findOne({
        where: retailerInput
    });
}
function listRetailers(retailerInput) {
    return Retailer.findAll({
        where: retailerInput
    });
}
exports.generateRetailerModel = (user) => ({
    create: (retailerInput) => {
        retailerInput.userCreatedId = user.id;
        return createRetailer(retailerInput);
    },
    get: (retailerInput) => {
        return getRetailer(retailerInput);
    },
    list: (retailerInput) => {
        return listRetailers(retailerInput);
    },
});
//# sourceMappingURL=retailer.js.map