"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catalog_1 = require("./catalog");
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const location_1 = require("./location");
class Store extends sequelize_1.Model {
}
exports.Store = Store;
Store.init({
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
exports.StoreLocation = Store.hasOne(location_1.Location, {
    foreignKey: 'location_id'
});
Store.hasOne(catalog_1.Catalog, {
    foreignKey: 'catalog_id'
});
function createStore(storeInput) {
    return Store.create(storeInput);
}
function getStore(storeInput) {
    return Store.findOne({
        where: storeInput
    });
}
function listStores(storeInput) {
    return Store.findAll({
        where: storeInput
    });
}
exports.generateStoreModel = (user) => ({
    create: (storeInput) => {
        return createStore(storeInput);
    },
    get: (storeInput) => {
        return getStore(storeInput);
    },
    list: (storeInput) => {
        return listStores(storeInput);
    }
});
//# sourceMappingURL=store.js.map