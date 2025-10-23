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
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./app/config/env");
const seedAdmin_1 = require("./app/modules/utils/seedAdmin");
const PORT = env_1.envVariables.PORT || 5000;
// const PORT = process.env.PORT || 5000;
let server;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(env_1.envVariables.DB_URL);
            // await mongoose.connect("mongodb+srv://WalletX:9He2qwtuqJomAlzg@cluster0.5b559.mongodb.net/WalletX?retryWrites=true&w=majority&appName=Cluster0")
            console.log("MongoDB connected");
            server = app_1.default.listen(PORT, () => {
                console.log(`💴💵💶💷💸💳 Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.error("Error starting server:", error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, seedAdmin_1.seedAdmin)();
}))();
// WalletX ||  9He2qwtuqJomAlzg
