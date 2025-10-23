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
exports.UserController = void 0;
const user_services_1 = require("./user.services");
const cathasync_1 = require("../utils/cathasync");
const sendResponsive_1 = require("../utils/sendResponsive");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Createuserwithwallet = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.UserService.Createuser(req.body);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "User and wallet create done",
        data: user
    });
}));
const getAllusers = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allusers = yield user_services_1.UserService.getAllusers();
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "Users retrieved successfully",
        data: allusers
    });
}));
const getSingleuser = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.UserService.getSingleuser(req.params.id);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "User retrieved successfully",
        data: user
    });
}));
const updateUser = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const payload = req.body;
    const decodedUser = req.user;
    const updateUser = yield user_services_1.UserService.updateUser(userId, payload, decodedUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "User Update successfully",
        data: updateUser
    });
}));
exports.UserController = {
    Createuserwithwallet,
    getAllusers,
    getSingleuser,
    updateUser
};
