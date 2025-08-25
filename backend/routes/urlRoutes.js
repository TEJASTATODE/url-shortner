const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");

const router = express.Router();

// POST /api/shorten – Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ message: "URL is required" });

  try {
    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortCode}` });
    }

    const shortCode = shortid.generate();
    url = await Url.create({ longUrl, shortCode });
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /:shortcode – Redirect to original URL
router.get("/:shortcode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortcode });
    if (!url) return res.status(404).json({ message: "URL not found" });

    url.clicks++;
    await url.save();
    return res.redirect(url.longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
