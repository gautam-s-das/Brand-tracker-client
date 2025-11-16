import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function SentimentPieChart({ mentions }) {
  const safeMentions = Array.isArray(mentions) ? mentions : [];
  const counts = { positive: 0, negative: 0, neutral: 0 };

  safeMentions.forEach((m) => {
    let s = m?.sentiment?.label || "neutral";
    s = s.toLowerCase();

    if (counts[s] !== undefined) counts[s]++;
  });

  const data = [
    { name: "Positive", value: counts.positive, key: "positive" },
    { name: "Negative", value: counts.negative, key: "negative" },
    { name: "Neutral", value: counts.neutral, key: "neutral" },
  ];

  const sentimentColors = {
    positive: "#22c55e",
    negative: "#ef4444",
    neutral: "#9ca3af",
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Sentiment Breakdown (Pie)</h2>

      <PieChart width={350} height={260}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={85}
          label
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.key} fill={sentimentColors[entry.key]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default SentimentPieChart;
