const { DataTypes } = require('sequelize')
const { Price } = require('./price.js')
const { ProductType } = require('./product_type.js')
const { sequelize } = require('../database/database.js')

const Product = sequelize.define('product', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    }, 
    name: {
        type: DataTypes.STRING,
        required: true,
        nullable: false,
    }
})

const ProductPrice = Product.hasOne(Price, {
    foreignKey: 'price_id'
})

const ProductProductType = Product.hasOne(ProductType, {
    foreignKey: 'product_type_id'
})

exports.Product = Product
exports.ProductPrice = ProductPrice
exports.ProductProductType = ProductProductType