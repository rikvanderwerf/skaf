const { DataTypes } = require('sequalize');
const { Product } = require('./product.js')
const { sequelize } = require('../database.js')

const Catalog = sequelize.define('catalog', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
})

Catalog.hasMany(Product, {
    as: 'products'
})

exports.Catalog = Catalog
