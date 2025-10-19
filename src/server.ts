
import { Server } from "http"
import app from "./app";
import mongoose from "mongoose";
import { envVariables } from "./app/config/env";
import { seedAdmin } from "./app/modules/utils/seedAdmin";

const PORT = envVariables.PORT || 5000;
// const PORT = process.env.PORT || 5000;
let server: Server;

async function startServer() {
    try {
        await mongoose.connect(envVariables.DB_URL)
        // await mongoose.connect("mongodb+srv://WalletX:9He2qwtuqJomAlzg@cluster0.5b559.mongodb.net/WalletX?retryWrites=true&w=majority&appName=Cluster0")

        console.log("MongoDB connected");

        server = app.listen(PORT, () => {
            console.log(`💴💵💶💷💸💳 Server is running on port ${PORT}`);
        })

    } catch (error) {
        console.error("Error starting server:", error);
    }
}

(async () => {
    await startServer();
    await seedAdmin()
})();


// WalletX ||  9He2qwtuqJomAlzg

