import { DataTypes, Model } from 'sequelize'
import { Product } from './product'
import { sequelize } from '../database/database'

export class Catalog extends Model {
	public id!: string
}

Catalog.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
}, {
	sequelize: sequelize
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