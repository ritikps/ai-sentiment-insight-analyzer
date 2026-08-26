import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Deployed backend URL
  const API_URL = 'https://ai-sentiment-insight-analyzer.onrender.com';

  // Fetch saved analysis history from PostgreSQL
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/history`);

      if (!res.ok) {
        throw new Error(`History request failed: ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  // Fetch history when page loads
  useEffect(() => {
    fetchHistory();
  }, []);

  // Send text to backend for AI analysis
  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      // Show latest AI result
      setAnalysis(data);

      // Refresh history after saving new analysis
      await fetchHistory();
    } catch (err) {
      console.error('Failed to analyze:', err);

      setAnalysis({
        sentiment: 'Error',
        summary: 'Failed to analyze the text. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Clear all saved analysis history
  const handleClearHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/history`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to clear history');
      }

      // Clear history from the screen
      setHistory([]);

      // Clear latest insight from the screen
      setAnalysis(null);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <header className="header">
        <h1>AI Insights Dashboard</h1>

        <span className="badge-live">
          ● Postgres DB Connected
        </span>
      </header>

      {/* Main Content */}
      <main className="content-grid">

        {/* Input Card */}
        <section className="card">
          <h3>Input Text</h3>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste messy text, feedback, or reviews here..."
            rows="6"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Analyze & Save to DB'}
          </button>
        </section>

        {/* Latest Insight Card */}
        <section className="card">
          <h3>Latest Insight</h3>

          {analysis ? (
            <div className="results-view">

              <p>
                <strong>Sentiment:</strong>{' '}
                {analysis.sentiment}
              </p>

              <p>
                <strong>Summary:</strong>{' '}
                {analysis.summary}
              </p>

              {/* Key Points */}
              {analysis.keyPoints &&
                analysis.keyPoints.length > 0 && (
                  <div>
                    <strong>Key Points:</strong>

                    <ul>
                      {analysis.keyPoints.map((point, index) => (
                        <li key={index}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Timestamp */}
              {analysis.timestamp && (
                <small className="timestamp">
                  Processed: {analysis.timestamp}
                </small>
              )}

            </div>
          ) : (
            <p className="placeholder-text">
              Submit text to generate real-time AI insights.
            </p>
          )}
        </section>
      </main>

      {/* PostgreSQL History Table */}
      <section
        className="card"
        style={{ marginTop: '20px' }}
      >

        {/* History Header + Small Clear Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ margin: 0 }}>
            Saved History Log (PostgreSQL)
          </h3>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              type="button"
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                width: 'auto',
                margin: 0,
              }}
            >
              Clear History
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>

            <table
              style={{
                width: '100%',
                textAlign: 'left',
                marginTop: '10px',
                borderCollapse: 'collapse',
              }}
            >

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sentiment</th>
                  <th>Summary</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {history.map((row) => (
                  <tr key={row.id}>

                    <td>
                      #{row.id}
                    </td>

                    <td>
                      {row.sentiment}
                    </td>

                    <td>
                      {row.summary}
                    </td>

                    <td>
                      {row.created_at
                        ? new Date(
                            row.created_at
                          ).toLocaleTimeString()
                        : '-'}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ) : (
          <p>No records saved yet.</p>
        )}

      </section>
    </div>
  );
}

export default App;