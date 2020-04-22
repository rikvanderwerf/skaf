const { Catalog } = require('./catalog.js')
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const { Location } = require('./location.js')  

export const Store = sequelize.define('store', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4 
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
})

export const StoreLocation = Store.hasOne(Location, {
    foreignKey: 'location_id'
})

Store.hasOne(Catalog, {
    foreignKey: 'catalog_id'
})

function createStore(storeInput) {
    return Store.create(storeInput)
}

function getStore(storeInput) {
    return Store.findOne({
        where: storeInput
    })
}

function listStores(storeInput) {
    return Store.findAll({
        where: storeInput
    })
}

export const generateStoreModel = (user) => ({
    create: (storeInput) => {
        return createStore(storeInput)
    },
    get: (storeInput) => {
        return getStore(storeInput)
    },
    list: (storeInput) => {
        return listStores(storeInput)
    }
})