import React, { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const ExplanationCard = ({ title, content, index }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
    style={{
      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
    }}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{content}</p>
  </div>
);

function App() {
  const [url, setUrl] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, { url });
      setTimestamp(response.data);
    } catch (err) {
      setError('Failed to fetch timestamp. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const steps = [
    {
      title: "URL Parsing",
      content: "We extract the unique post ID from the LinkedIn URL. This ID is a crucial part of the timestamp."
    },
    {
      title: "ID Conversion",
      content: "The extracted ID is converted to its binary representation, focusing on the first 41 bits."
    },
    {
      title: "Timestamp Extraction",
      content: "These 41 bits represent the milliseconds since the LinkedIn epoch. We convert this binary number to a decimal timestamp."
    },
    {
      title: "Date Calculation",
      content: "Finally, we add this timestamp to the LinkedIn epoch start date to get the post's creation date and time."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 pb-16 pt-20 z-10">
      <button
        onClick={toggleExplanation}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {showExplanation ? 'Return' : 'How does this work?'}
      </button>

      <div className="max-w-6xl mx-auto">
        {!showExplanation ? (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Decode LinkedIn Post Timestamp</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={handleChange}
                placeholder="Input URL here"
                className="w-full p-2 border rounded-lg text-lg"
                required
              />
              <button
                type="submit"
                className="w-full p-2 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Generate Post Date'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {timestamp && (
              <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm animate-fade-in">
                <h2 className="text-lg font-semibold text-green-800 mb-2">Timestamp Retrieved</h2>
                <p className="text-green-700">{new Date(timestamp).toLocaleString()}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-center">How It Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <ExplanationCard key={index} title={step.title} content={step.content} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-gray-600 flex items-center justify-center absolute bottom-4 left-1/2 transform -translate-x-1/2 z-0">
        Made with ♥️ by{' '}
        <a
          href="https://www.linkedin.com/in/jasonkimbusiness"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 font-semibold hover:text-blue-500 transition-colors"
        >
          Jason Kim
        </a>
      </footer>
    </div>
  );
}

export default App;