import { useEffect, useState } from "react";
import API from "../utils/api";
import SentimentChart from "../components/SentimentChart";
import MentionList from "../components/MentionList";
import socket from "../utils/socket";


function Dashboard() {
  const [mentions, setMentions] = useState([]);

  useEffect(() => {
    // initial fetch
    API.get("/mentions?brand=nike").then(res => setMentions(res.data));

    // real-time updates
    socket.on("mention:new", (mention) => {
      setMentions(prev => [mention, ...prev]);
    });
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Brand Dashboard</h1>
      
      <SentimentChart mentions={mentions} />
      <MentionList mentions={mentions} />
    </div>
  );
}

export default Dashboard;
