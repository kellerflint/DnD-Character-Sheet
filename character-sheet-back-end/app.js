const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

const BASE_API = 'https://api.open5e.com';
const characterInfo = new Set(['races', 'classes', 'backgrounds']);

app.use(cors());
app.use(express.json());

app.get("/api/health-check/:reference", async (req, res) => {
   try {
      const { reference } = req.params;

      if (!characterInfo.has(reference)) {
         return res.status(404).json({ error: "Reference is not available" });
      }

      const url = `${BASE_API}/${reference}`;
      const response = await axios.get(url);
      res.json(response.data);
   } catch (error) {
      console.error('Error fetching from external API: ', error);
      res.status(500).json({ message: 'Error fetching data' });
   }
});

const authRoutes = require("./routes/authenticateRoutes");
app.use("/", authRoutes);

module.exports = app; 