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
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
})

const StoreLocation = Store.hasOne(Location, {
    foreignKey: 'location_id'
})

Store.hasOne(Catalog, {
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

exports.Catalog = Catalog
exports.createStore = createStore
exports.listStores = listStores
exports.Store = Store 
exports.StoreLocation = StoreLocation