import mongoose from "mongoose";
import dns from "dns";

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

export async function connectToMongoDB() {
    try {
        console.log("Connecting...");

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB connected successfully!");

    } catch (err) {
        console.log("MongoDB connection failed:", err.message);
    }
}