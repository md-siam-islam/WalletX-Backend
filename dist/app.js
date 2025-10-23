"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorhandle_1 = require("./GlobalError/globalErrorhandle");
const route_1 = require("./app/route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const process_1 = require("process");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.set('trust proxy', 1);
app.use((0, cors_1.default)({
    origin: process_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use('/api/v1', route_1.router);
app.get('/', (req, res) => {
    res.send('Hello, WalletX!');
});
app.use(globalErrorhandle_1.globalErrorHandler);
exports.default = app;
