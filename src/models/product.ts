import { DataTypes, Model } from 'sequelize'
import { Price } from './price'
import { ProductType } from './product_type'
import { User } from './user'
import { Store } from './store'

export class Product extends Model {
    public id!: string
    public name!: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        Product.belongsToMany(models.Store, {
            through: 'StoreProduct'
        })
        this.hasOne(models.Price, {
            foreignKey: 'price_id'
        })
        this.hasOne(models.ProductType, {
            foreignKey: 'product_type_id'
        })
    }
}

function createProduct(productInput) {
	return Product.create(productInput)
}

function listProducts(productInput) {
	return Product.findAll({
		where: productInput
	})
}

export function getProductById(id) {
    return Product.findOne({
        where: {
            id: id
        }
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