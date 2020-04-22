"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const retailer_1 = require("./retailer");
const database_1 = require("../database/database");
exports.User = database_1.sequelize.define('user', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        
        validate: {
            min: 8
        }
    }
}, { underscored: true });
exports.User.hasMany(retailer_1.Retailer, {
    foreignKey: "user_created_id",
    as: "Retailers"
});
function createUser(userInput) {
    return exports.User.create(userInput);
}
function getUser(userInput) {
    return exports.User.findOne({
        where: userInput
    });
}
exports.getUser = getUser;
function listUsers(userInput) {
    return exports.User.findAll({
        where: userInput
    });
}
exports.generateUserModel = (user) => ({
    create: (userInput) => {
        return createUser(userInput);
    },
    get: (userInput) => {
        return getUser(userInput);
    },
    list: (userInput) => {
        return listUsers(userInput);
    },
});
//# sourceMappingURL=user.js.map