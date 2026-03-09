const express = require("express");
const app = express();

const homeRoutes = require("./routes/homeRoutes");
const todoRoutes = require("./routes/todoRoutes");
const connectDB = require("./config/db");

app.use(express.json());
app.use(express.static("public"));

// Connect db
connectDB();

// Routes
app.use("/", homeRoutes);

// Todo routes
app.use("/todos", todoRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
