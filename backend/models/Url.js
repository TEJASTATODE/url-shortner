const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  longUrl: { 
    type: String, 
    required: true, 
    trim: true 
  },
  shortCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  clicks: { 
    type: Number, 
    default: 0 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
