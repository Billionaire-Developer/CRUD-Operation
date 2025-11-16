const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

async function connectDB() {
    if (db) return db;

    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();
    db = client.db(process.env.DB_NAME); // database name from .env

    console.log("Connected to MongoDB (Native Driver)");
    return db;
}

module.exports = connectDB;
