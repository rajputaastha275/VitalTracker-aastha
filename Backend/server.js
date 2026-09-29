import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongoDB } from "./Config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import healthRoutes from "./Routes/healthRoutes.js";
import aiRoutes from "./Routes/aiRoutes.js";

dotenv.config();

console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "VitalTracker API is running" });
});

app.use("/api/users", userRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/ai", aiRoutes);

connectToMongoDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
