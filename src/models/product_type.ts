import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database'

export class ProductType extends Model {
    public id!: string
    public name!: string
}

ProductType.init({
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

ProductType.belongsTo(ProductType, {
    as: 'parent',
    foreignKey: 'product_type_parent_id'
})

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
