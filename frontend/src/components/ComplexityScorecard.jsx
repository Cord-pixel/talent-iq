import React, { useState } from "react";

export default function ComplexityScorecard({ code, language }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!code) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Failed to analyze code complexity:", err);
      setError("Unable to compute complexity analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white mt-4">
      <button
        onClick={handleAnalyze}
        disabled={loading || !code}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-sm font-semibold transition"
      >
        {loading ? "Analyzing Code..." : "Run Complexity Analysis"}
      </button>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      {analysis && (
        <div className="mt-4 space-y-2 text-sm border-t border-gray-800 pt-3">
          <p>
            <strong>Time Complexity:</strong>{" "}
            <span className="text-green-400 font-mono">
              {analysis.timeComplexity}
            </span>
          </p>
          <p>
            <strong>Space Complexity:</strong>{" "}
            <span className="text-green-400 font-mono">
              {analysis.spaceComplexity}
            </span>
          </p>
          <p>
            <strong>Optimization Feedback:</strong> {analysis.optimizationTip}
          </p>
        </div>
      )}
    </div>
  );
}
