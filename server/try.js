const express = require("express");
const cookieParser = require('cookie-parser');

// Create an Express app
const app = express();

// Use middleware
app.use(cookieParser());

// Define a test route
app.get("/test-cookie", (req, res) => {
    try {
        const token = "your_dummy_token"; // Replace with an actual token
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1800000});
        res.status(200).json({ message: "Cookie set successfully" });
    } catch (error) {
        console.error("Error setting cookie:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});