const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Short hand to load variables from .env file
require("dotenv").config();

const app = express();

// Adding this information since we will be using multiple api connections
// We will use a set that we can use to check the different apis
const BASE_API = 'https://api.open5e.com';
// We can add more to the set as the project progresses
const classInfo = new Set(['races', 'classes', 'backgrounds']);

// Uses the PORT from .env or defaults to 3001
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors());
app.use(express.json());

// Back-end route health check - using /api to differentiate from front-end routes (if any are added later)
app.get("/api/health-check/:reference", async (req, res) => {
   try {
      // Saving the parameter into a reference variable
      const { reference } = req.params;
      // If the reference api is not available or not available through the available class information, send 404 error
      if (!classInfo.has(reference)) {
         return res.status(404).json({error:"Reference is not available"})
      }
      const url = `${BASE_API}/${reference}`;
      const response = await axios.get(url);
      res.json(response.data);
   } catch (error) {
      console.error('Error, cannot connect and fetch from external API: ', error);
      res.status(500).json({message: 'Error fetching data'});
   }
});

// Routes
const authRoutes = require("./routes/authenticateRoutes");
app.use("/", authRoutes);

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});