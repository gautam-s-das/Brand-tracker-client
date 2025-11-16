const mongoose = require("mongoose");

const MentionSchema = new mongoose.Schema({
  text: String,
  source: String, // Twitter, Reddit, News etc.
  sentiment: {
    label: String, // positive, negative, neutral
    score: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mention", MentionSchema);
