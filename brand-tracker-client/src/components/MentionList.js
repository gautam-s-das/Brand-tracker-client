function MentionList({ mentions }) {
  const safeMentions = Array.isArray(mentions) ? mentions : [];

  const sentimentColors = {
    positive: "bg-green-100 text-green-700",
    negative: "bg-red-100 text-red-700",
    neutral: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Latest Mentions</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3 border-b">Text</th>
            <th className="p-3 border-b">Source</th>
            <th className="p-3 border-b">Sentiment</th>
            <th className="p-3 border-b">Time</th>
          </tr>
        </thead>

        <tbody>
          {safeMentions.map((m, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {/* TEXT */}
              <td className="p-3 border-b max-w-xs">
                <p className="font-medium truncate">{m.text}</p>
              </td>

              {/* SOURCE */}
              <td className="p-3 border-b text-sm text-gray-600">
                {m.source}
              </td>

              {/* SENTIMENT */}
              <td className="p-3 border-b">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    sentimentColors[m.sentiment?.label || "neutral"]
                  }`}
                >
                  {(m.sentiment?.label || "neutral").toUpperCase()}
                </span>
              </td>

              {/* TIME */}
              <td className="p-3 border-b text-sm text-gray-500">
                {new Date(m.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No data message */}
      {safeMentions.length === 0 && (
        <p className="text-gray-500 text-center py-4">No mentions found.</p>
      )}
    </div>
  );
}

export default MentionList;
