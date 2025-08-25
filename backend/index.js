const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const urlRoutes = require("./routes/urlRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173", // Frontend URL
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
app.get('/', (req, res) => {
  res.send("Welcome to the URL Shortener API");
});

// Use Routes
app.use('/api', urlRoutes);
app.use('/api/admin', adminRoutes);
app.use('/', urlRoutes); // ✅ This will allow /abc123 to be handled by the router

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port :http://localhost:${PORT}`));
