import { DataTypes } from 'sequelize'
import { Product } from './product'
import { sequelize } from '../database/database'

export const Catalog = sequelize.define('catalog', {
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

export const generateCatalogModel = (user) => ({
	get: (catalogInput) => {
		return getCatalog(catalogInput)
	},
	create: (catalogInput) => {
		return createCatalog(catalogInput)
	}
})