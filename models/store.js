const { Catalog } = require('./catalog.js')
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const { Location } = require('./location.js')  

const Store = sequelize.define('store', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4 
    },
    latitude: {
        type: DataTypes.DECIMAL,
        required: false,
    },
    longitude: {
        type: DataTypes.DECIMAL,
        required: false, 
    }
})

Location.hasOne(Location, {
    foreignKey: 'location_id'
})

Location.hasOne(Catalog, {
    foreignKey: 'catalog_id'
})

function listStores(storeInput) {
    return Store.findALl({
        where: storeInput
    })
}

function createStore(args) {
    return Store.create(args)
}

exports.createStore = createStore
exports.listStores = listStores
exports.Store = Store 
