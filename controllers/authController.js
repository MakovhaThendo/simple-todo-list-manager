const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, rememberMe } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            rememberMe
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};
