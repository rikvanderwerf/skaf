const { DataTypes } = require('sequelize');
const { Product } = require('./product.js')
const { sequelize } = require('../database/database.js')

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

function getCatalog(catalogInput) {
	return Catalog.findOne({
		where: catalogInput
	})
}

function createCatalog(catalogInput) {
	return Catalog.create(catalogInput)
}

const generateCatalogModel = (user) => ({
	get: (catalogInput) => {
		getCatalog(catalogInput) 
	},
	create: (catalogInput) => { 
		createCatalog(catalogInput) 
	}
})

exports.Catalog = Catalog
exports.generateCatalogModel = generateCatalogModel