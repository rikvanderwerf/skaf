const { Catalog } = require('./catalog.js')
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/database.js');
const { Location } = require('./location/location.js')  

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

exports.Store = Store 
