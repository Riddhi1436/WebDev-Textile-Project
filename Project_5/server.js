const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Backend API URL
const BACKEND_API = "http://localhost:3000/api";

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================
   PROXY ROUTES - PRODUCTS
========================= */

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_API}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch products",
      details: error.message
    });
  }
});

/* =========================
   PROXY ROUTES - INQUIRIES
========================= */

// Submit new inquiry
app.post("/api/inquiries", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: true,
        message: "All fields are required"
      });
    }

    const response = await axios.post(`${BACKEND_API}/inquiries`, {
      name,
      email,
      message
    });

    res.status(201).json({
      error: false,
      message: "Thank you! Your inquiry has been submitted.",
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to submit inquiry",
      details: error.message
    });
  }
});

/* =========================
   ERROR HANDLING
========================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: true,
    message: "Internal server error",
    details: err.message
  });
});

/* =========================
   START SERVER
========================= */
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Customer Website running on port ${PORT}`);
  console.log(`Website: http://localhost:${PORT}`);
  console.log(`Backend: ${BACKEND_API}`);
});
