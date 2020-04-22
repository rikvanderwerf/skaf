import { DataTypes } from 'sequelize'
import { Price } from './price'
import { ProductType } from './product_type'
import { sequelize } from '../database/database'
import { User } from './user'

export const Product = sequelize.define('product', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const ProductPrice = Product.hasOne(Price, {
    foreignKey: 'price_id'
})

export const ProductProductType = Product.hasOne(ProductType, {
    foreignKey: 'product_type_id'
})

function createProduct(productInput) {
	return Product.create(productInput)
}

function listProducts(productInput) {
	return Product.findAll({
		where: productInput
	})
}

function getProduct(productInput) {
	return User.findOne({
		where: productInput
	})
}

export const generateProductModel = (user) => ({
    list: (productInput) => {
        return listProducts(productInput)
    },
    get: (productInput) => {
        return getProduct(productInput)
    },
    create: (productInput) => {
        return createProduct(productInput)
    }
})