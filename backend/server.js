require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const Mention = require("./model/Mention");
const cron = require("node-cron");
const app = express();
app.use(cors());
app.use(express.json());
const {
  fetchTweets,
  fetchRedditMentions,
  fetchNews,
} = require("./Services/fetchMentions");
const Sentiment = require("sentiment");

const sentimentAnalyzer = new Sentiment();

app.get("/api/fetch-all", async (req, res) => {
  try {
    const brand = req.query.brand || "nike";

    const tweets = await fetchTweets(brand);
    const reddit = await fetchRedditMentions(brand);
    const news = await fetchNews(brand);

    const allMentions = [...tweets, ...reddit, ...news];

    // SAVE EACH RESULT TO THE DATABASE
    let savedMentions = [];

    for (const mention of allMentions) {
      // Run sentiment analysis
      const analysis = sentimentAnalyzer.analyze(mention.text);

      const sentimentLabel =
        analysis.score > 0 ? "positive" :
        analysis.score < 0 ? "negative" :
        "neutral";

      const saved = await Mention.create({
        text: mention.text,
        source: mention.source,
        sentiment: {
          label: sentimentLabel,
          score: analysis.score
        }
      });

      savedMentions.push(saved);
    }

    res.json({
      saved: savedMentions.length,
      data: savedMentions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



connectDB();
// HTTP server
const server = http.createServer(app);

// Socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Temporary in-memory mentions list
// let mentions = [
//   {
//     text: "Great product!",
//     sentiment: { label: "positive" },
//   },
//   {
//     text: "Could be better.",
//     sentiment: { label: "neutral" },
//   },
//   {
//     text: "Very disappointed.",
//     sentiment: { label: "negative" },
//   },
// ];

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Example: when frontend sends a new mention
  socket.on("mention:new", (mention) => {
    // mentions.unshift(mention);   // add to list
    io.emit("mention:new", mention); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// API Endpoint - return the mentions array
app.get("/api/mentions", async (req, res) => {
   try {
    const mentions = await Mention.find().sort({ createdAt: -1 });
    res.json(mentions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
});


// API to ADD a new mention (test endpoint)
// ------------------------------------
app.post("/api/mentions", async (req, res) => {
  try {
    const { text, source, sentiment } = req.body;

    const newMention = await Mention.create({
      text,
      source,
      sentiment,
    });

    // send real-time update to clients
    io.emit("mention:new", newMention);

    res.json(newMention);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("⏳ Auto Fetching Mentions...");

    const brand = "nike"; // you can make this dynamic later

    const tweets = await fetchTweets(brand);
    const reddit = await fetchRedditMentions(brand);
    const news = await fetchNews(brand);

    const allMentions = [...tweets, ...reddit, ...news];

     for (const mention of allMentions) {
      const analysis = sentimentAnalyzer.analyze(mention.text);

      const sentimentLabel =
        analysis.score > 0 ? "positive" :
        analysis.score < 0 ? "negative" :
        "neutral";

      const saved = await Mention.create({
        text: mention.text,
        source: mention.source,
        sentiment: {
          label: sentimentLabel,
          score: analysis.score
        }
      });

      io.emit("mention:new", saved);
    }

    console.log(`✅ Saved ${allMentions.length} mentions`);
  } catch (err) {
    console.error("Cron Error:", err.message);
  }
});
console.log("Twitter Key Loaded:", process.env.TWITTER_BEARER ? "YES" : "NO");



server.listen(5000, () => {
  console.log("Server running on port 5000");
});
