/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const summarize = async () => {
    if (!text.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setLoading(true);

    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const options = {
      method: "GET",
      url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
      params: { url: text, lang: "en", engine: "2" },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setSummary(response.data.summary || "No summary available.");
    } catch (error) {
      setError("Error fetching summary. Please try again.");
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 p-6">
<div className="bg-gray-200 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-300 transition-all duration-300 ease-in-out">
<h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          📰 Article Summarizer
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter article URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            value={text}
          />
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={summarize}
          >
            {loading ? "Loading..." : "Summarize"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Summary</h2>
          <div className="mt-3 p-4 bg-gray-300 rounded-md h-40 overflow-y-auto">
            {loading ? "Fetching summary..." : summary || "No summary yet."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
