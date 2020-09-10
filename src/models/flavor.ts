import { Model } from 'sequelize'

export class Flavor extends Model {
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
                unique: true
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Product, {
            through: 'ProductFlavor'
        })
    }
}

export function createFlavor(flavorInput) {
    return Flavor.create(flavorInput)
}