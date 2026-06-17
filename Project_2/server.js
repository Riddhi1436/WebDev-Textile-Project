const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let inquiries = [];

// GET API
app.get("/api/inquiries", (req, res) => {
    res.json(inquiries);
});

// POST API
app.post("/api/inquiries", (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const inquiry = {
        id: Date.now(),
        name,
        email,
        message
    };

    inquiries.push(inquiry);

    res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully",
        data: inquiry
    });
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});