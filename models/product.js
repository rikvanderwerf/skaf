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

const generateProductModel = ({ user }) => ({
    list: (productInput) => {
        listProducts(productInput)
    },
    get: (productInput) => {
        getProduct(productInput)
    },
    create: (productInput) => {
        createProduct(productInput)
    }
})

exports.generateProductModel = generateProductModel
exports.Product = Product
exports.ProductPrice = ProductPrice
exports.ProductProductType = ProductProductType
