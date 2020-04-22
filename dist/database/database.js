"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.sequelize = new sequelize_1.default.Sequelize('postgres://login_role:password@postgresql_db:5432/postgres');
//# sourceMappingURL=database.js.map