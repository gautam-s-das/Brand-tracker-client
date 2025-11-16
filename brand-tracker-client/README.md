Brand Reputation & Mention Tracker

A full-stack web application that tracks brand mentions across Twitter (X), Reddit, and Google News in real time.
The system performs sentiment analysis, stores data in MongoDB Atlas, and displays insights in an interactive React dashboard with charts, tables, and live updates through Socket.io.

🔗 GitHub Repository:
https://github.com/gautam-s-das/Brand-reputation-tracker

Table of Contents

Overview

Features

Tech Stack

Architecture

Folder Structure

Environment Variables

Backend Setup

Frontend Setup

API Endpoints

Approach & Key Decisions

Screenshots

Future Enhancements

🚀 Overview

The Brand Reputation Tracker enables marketing teams, analysts, or brand managers to monitor how people talk about their brand online.
It fetches mentions from:

Twitter (X)
Reddit
Google News
Each mention is analyzed for sentiment, saved to MongoDB, and streamed to a dashboard in real time using Socket.io.

The system performs:

Sentiment Analysis (positive / negative / neutral)

Trend Visualization (Recharts)

Scheduled Fetching (Cron jobs)

Real-time Streaming of New Mentions

Persistent Storage in MongoDB Atlas
Features
🔍 Multi-Platform Mention Fetching

Fetches mentions from:

Twitter (X)

Reddit

Google News

🤖 Sentiment Analysis

Each mention includes:

Sentiment label

Sentiment score

📊 Dashboard Visualizations

The frontend dashboard includes:

Pie Charts

Bar Charts

Table Views

Real-time updates via WebSocket

⚡ Real-Time Streaming

Newly fetched mentions appear immediately using Socket.io.

🕒 Automatic Background Jobs

A Cron job runs every 5 minutes, fetching new mentions automatically.

💾 Persistent Storage

All mentions (with timestamps) are stored in MongoDB Atlas.

🧰 Tech Stack
Frontend

React.js

Tailwind CSS

Recharts

Axios

Socket.io Client

Backend

Node.js

Express.js

Mongoose

Sentiment (NLP)

Axios

Socket.io

node-cron

brand-reputation-tracker/
│
├── backend/
│   ├── model/
│   ├── Services/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── brand-tracker-client/
    ├── src/
    ├── public/
    ├── build/
    ├── package.json
    ├── .env.example
    └── .gitignore
🔐 Environment Variables
Backend → backend/.env
makefile
Copy code
PORT=5000
MONGO_URI=
TWITTER_BEARER=
NEWS_API_KEY=
Frontend → brand-tracker-client/.env
bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
🛠️ Backend Setup
bash
Copy code
cd backend
npm install
npm start
🖥️ Frontend Setup
bash
Copy code
cd brand-tracker-client
npm install
npm start

Approach & Key Decisions

Chose MongoDB Atlas for scalability and flexible document structure.

Used Socket.io to push new mentions instantly without page refresh.

Separated services for Twitter, Reddit, and News to keep the code modular.

Cron jobs ensure scheduled automated collection.

Recharts chosen for accessible, customizable visual graphics.
