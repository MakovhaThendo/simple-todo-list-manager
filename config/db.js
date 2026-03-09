const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ProjEctDB");

        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.log("Database connection failed ❌", error);
    }
};

module.exports = connectDB;
