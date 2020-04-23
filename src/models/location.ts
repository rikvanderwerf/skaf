import { Address } from './address'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database'

export class Location extends Model {
    public id!: string
    public latitude: string
    public longitude: string
}

Location.init({
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    latitude: {
        type: DataTypes.DECIMAL,
    },
    longitude: {
        type: DataTypes.DECIMAL,
    }
}, {
    sequelize: sequelize
})

export const LocationAddress = Location.hasOne(Address, {
    foreignKey: 'address_id'
})
