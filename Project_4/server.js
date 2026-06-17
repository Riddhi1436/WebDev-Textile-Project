const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Base URL for Project_3 backend
const PROJECT_3_API = "http://localhost:3000/api";

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================
   PROXY ROUTES - INQUIRIES
========================= */

// Get all inquiries
app.get("/api/inquiries", async (req, res) => {
  try {
    const response = await axios.get(`${PROJECT_3_API}/inquiries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch inquiries",
      details: error.message
    });
  }
});

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

    const response = await axios.post(`${PROJECT_3_API}/inquiries`, {
      name,
      email,
      message
    });

    res.status(201).json({
      error: false,
      message: "Inquiry submitted successfully",
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
   PROXY ROUTES - PRODUCTS
========================= */

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(`${PROJECT_3_API}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch products",
      details: error.message
    });
  }
});

// Create product (admin)
app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: true,
        message: "Required fields: name, description, price, category"
      });
    }

    const response = await axios.post(`${PROJECT_3_API}/products`, {
      name,
      description,
      price,
      category,
      image
    });

    res.status(201).json({
      error: false,
      message: "Product created successfully",
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to create product",
      details: error.message
    });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${PROJECT_3_API}/products/${id}`, req.body);

    res.json({
      error: false,
      message: "Product updated successfully",
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to update product",
      details: error.message
    });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${PROJECT_3_API}/products/${id}`);

    res.json({
      error: false,
      message: "Product deleted successfully",
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to delete product",
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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
});
