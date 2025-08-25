const express = require("express");
const Url = require("../models/Url");

const router = express.Router();

// GET /api/admin/urls – List all shortened URLs
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ date: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
