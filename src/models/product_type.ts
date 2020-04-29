import { Model } from 'sequelize'

export class ProductType extends Model {
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
                allowNull: false,
                unique: true,
            },
            product_type_parent_id: {
                type: DataTypes.UUID,
                allowNull: true,
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.ProductType, {
            as: 'parentType',
            foreignKey: 'product_type_parent_id'
        })
        this.hasMany(models.ProductType, {
            as: 'childTypes',
            foreignKey: 'product_type_parent_id'
        })
    }
}

function listProductTypes(productTypeInput) {
    return ProductType.findAll({
        where: productTypeInput
    })
}

export function createProductType(productTypeInput) {
    return ProductType.create(productTypeInput)
}

export const generateProductTypeModel = () => ({
    list: (productTypeInput) => {
        listProductTypes(productTypeInput)
    }
})
