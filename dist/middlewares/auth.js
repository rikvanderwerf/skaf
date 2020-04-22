"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUserFromRequestIfLoggedIn(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = request.get('Authorization');
        if (!authHeader) {
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token || token === '') {
            return;
        }
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.decode(token, 'privateKey');
        }
        catch (error) {
            return;
        }
        return yield user_1.getUser({ 'id': decodedToken.userId });
    });
}
exports.getUserFromRequestIfLoggedIn = getUserFromRequestIfLoggedIn;
//# sourceMappingURL=auth.js.map