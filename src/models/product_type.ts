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
                unique: false,
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

export const generateProductTypeModel = (user) => ({
    list: (productTypeInput) => {
        listProductTypes(productTypeInput)
    }
})
