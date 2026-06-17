const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const Inquiry = require("./models/Inquiry");
const Product = require("./models/Product"); // make sure this exists

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://admin:Riddhi1234@cluster0.mdqhsr5.mongodb.net/textileDB?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

/* =========================
   INQUIRIES ROUTES
========================= */

// Create inquiry
app.post("/api/inquiries", async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all inquiries
app.get("/api/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update inquiry
app.put("/api/inquiries/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete inquiry
app.delete("/api/inquiries/:id", async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);

    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   PRODUCTS ROUTES
========================= */

// Create product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});