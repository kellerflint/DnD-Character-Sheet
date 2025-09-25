const express = require("express");
const cors = require("cors");

// Short hand to load variables from .env file
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors());
app.use(express.json());

// Back-end route health check - using /api to distinguish from front-end routes
app.get("/api/check", (req, res) => {
   res.send("Hello from the back-end side!");
})

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})