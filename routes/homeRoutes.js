const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authController");
const User = require("../models/User");

//  check if server is running
router.get("/", (req, res) => {
    res.send("ProjEct server is running 🚀");
});

//  (POST request)
router.post("/register", registerUser);

//  (GET request)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find(); // Fetch  users from database
        res.json(users); // Send users as JSON response
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;
