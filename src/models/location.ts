import { Address } from './address'
import { DataTypes, Model } from 'sequelize'

export class Location extends Model {
    public id!: string
    public latitude: string
    public longitude: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
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
    }

    static associate(models) {
        console.timeLog(models)
        // this.hasOne(models.Address, {
        //     foreignKey: 'address_id'
        // })        
    }
}