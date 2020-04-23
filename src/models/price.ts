import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database'

export class Price extends Model {
    public id!: string
    public currency!: string
    public priceIncents!: number
}

Price.init({
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