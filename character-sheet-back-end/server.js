const express = require("express");
const cors = require("cors");

// Short hand to load variables from .env file
require("dotenv").config();

const app = express();

// Uses the PORT from .env or defaults to 3001
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors());
app.use(express.json());

// Back-end route health check - using /api to differentiate from front-end routes (if any are added later)
app.get("/api/check", (req, res) => {
   res.send("Hello from the back-end side!");
})

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})