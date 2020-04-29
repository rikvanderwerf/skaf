import { Model } from 'sequelize'

export class Price extends Model {
    public id!: string
    public currency!: string
    public priceIncents!: number 

    static init(sequelize, DataTypes) {
        return super.init.call(this,{
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            priceInCents: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'price_in_cents'
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.CatalogItemVariant, {
            foreignKey: 'price_id'
        })
    }
}