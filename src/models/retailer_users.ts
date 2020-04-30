import { Model } from 'sequelize'
import { threadId } from 'worker_threads'

export class RetailerUser extends Model {
    public retailerId!: string
    public userId!: string
    public role!: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
            retailerId: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                field: 'retailer_id'
            },
            userId: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                field: 'user_id'
            },
            role: {
                type: DataTypes.ENUM(['admin', 'editor']),
                allowNull: false,
            }
        }, { sequelize: sequelize })
    }

    static assocate(models) {
        this.belongsTo(models.Retailer, {
            foreignKey: 'retailer_id'
        })
        this.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
    }

    _acl = () => {
        if (this.role == 'admin') {
            const admin = `user:${this.userId}`
            return {
                user: ['retailerUsers.put']
            }
        }
        return {}
    }

    acl = this._acl()
}

function createRetailerUser(retailerUserInput) {
    return RetailerUser.create(retailerUserInput)
}

export const generateRetailerUserModel = () => ({
    create: (retailerUserInput) => {
        return createRetailerUser(retailerUserInput)
    }
})
