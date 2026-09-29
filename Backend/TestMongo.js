import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL, {
    directConnection: true,
    serverSelectionTimeoutMS: 10000
});

try {
    await client.connect();

    const result = await client.db("admin").command({ hello: 1 });

    console.log("Connected!");
    console.log("Is primary:", result.isWritablePrimary);
    console.log("Primary:", result.primary);

    await client.close();
} catch (error) {
    console.log("ERROR:", error.message);
}