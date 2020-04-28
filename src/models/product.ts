import { Model } from 'sequelize'
import { User } from './user'

export class Product extends Model {
    public id!: string
    public name!: string
    public description!: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            product_type_id: {
                type: DataTypes.UUID,
                allowNull: false,
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Store, {
            through: 'StoreProduct'
        })
        this.belongsToMany(models.Flavor, {
            through: 'ProductFlavor'
        })
        this.belongsToMany(models.Effect, {
            through: 'ProductEffects'
        })
        this.hasOne(models.Price, {
            foreignKey: 'price_id'
        })
        this.hasOne(models.ProductType, {
            foreignKey: 'product_type_id'
        })
    }
}

export async function createProduct(productInput) {
    const product = await Product.create(productInput)
    return product
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