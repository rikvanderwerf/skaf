const Sequalize = require('sequelize');

const sequelize = new Sequalize('postgres://login_role:password@postgresql_db:5432/postgres')

module.exports = { sequelize: sequelize }
