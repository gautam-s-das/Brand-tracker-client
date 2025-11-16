const axios = require("axios");
const Parser = require("rss-parser");
const parser = new Parser();

// ------------------------------------------
// 1. TWITTER (X) — Requires API Key
// ------------------------------------------
async function fetchTweets(brand) {
    console.log("🔎 Fetching tweets for:", brand);
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=${brand}&max_results=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
        },
      }
      );
      console.log("🐦 Tweets fetched:", response.data.data?.length || 0);

    if (!response.data.data) return [];

    return response.data.data.map((tweet) => ({
      text: tweet.text,
      source: "Twitter",
    }));
  } catch (err) {
    console.error("❌ Twitter Fetch Error:", err.message);
    return [];
  }
}

// ------------------------------------------
// 2. REDDIT — FREE (No API Key Required)
// ------------------------------------------
async function fetchRedditMentions(brand) {
    console.log("🔎 Fetching Reddit data:", brand);
  try {
    const response = await axios.get(
      `https://www.reddit.com/search.json?q=${brand}`
    );

    return response.data.data.children.map((post) => ({
      text: post.data.title,
      source: "Reddit",
    }));
  } catch (err) {
    console.error("❌ Reddit Fetch Error:", err.message);
    return [];
  }
}

// ------------------------------------------
// 3. NEWS (via NewsAPI) — Requires API Key
// ------------------------------------------
async function fetchNews(brand) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${brand}&apiKey=${process.env.NEWS_API_KEY}`
    );

    return response.data.articles.map((article) => ({
      text: article.title,
      source: "News",
    }));
  } catch (err) {
    console.error("❌ NewsAPI Error:", err.message);
    return [];
  }
}

module.exports = {
  fetchTweets,
  fetchRedditMentions,
  fetchNews,
};
// ------------------------------------------
