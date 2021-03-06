import { Model, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin} from 'sequelize'
import { User } from './user'
import { Flavor } from './flavor'
import { Effect } from './effect'
import { ProductType } from './product_type'
import { createPaginationObject } from '../lib/utils'

export class Product extends Model {
    public id!: string
    public name!: string
    public productTypeId!: string

    public addFlavor!: BelongsToManyAddAssociationMixin<Flavor, Flavor['id']>
    public getFlavors!: BelongsToManyGetAssociationsMixin<Flavor>

    public addEffect!: BelongsToManyAddAssociationMixin<Effect, Effect['id']>
    public getEffects!: BelongsToManyGetAssociationsMixin<Effect>
    

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
            productTypeId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'product_type_id'
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Flavor, {
            through: 'ProductFlavor'
        })
        this.belongsToMany(models.Effect, {
            through: 'ProductEffects'
        })
        this.hasOne(models.ProductType, {
            foreignKey: 'product_type_id'
        })
    }

    productType = () => {
        return ProductType.findOne()
    }

    _acl = () => {
        return {
            'authenticated': ['product.list']
        }
    }

    acl = this._acl()
}

export async function createProduct(productInput) {
    const product = await Product.create(productInput)
    return product
}

function listProducts(paginationObject) {
	return Product.findAll(paginationObject)
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

export const generateProductModel = () => ({
    list: (productInput, pageSize, lastPageKey) => {
        return listProducts(createPaginationObject(productInput, pageSize, lastPageKey))
    },
    get: (productInput) => {
        return getProduct(productInput)
    },
    create: (productInput) => {
        return createProduct(productInput)
    }
})