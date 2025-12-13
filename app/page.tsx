"use client";

import { useState } from "react";

interface PredictionResponse {
  review: string;
  predicted_score: number;
  confidence: {
    [key: string]: number;
  };
  model: string;
  sentiment: string;
}

export default function Home() {
  const [review, setReview] = useState("");
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review.trim()) {
      setError("Please enter a review");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(
        "Error: Make sure the Flask backend is running on http://localhost:5000"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-600";
      case "Negative":
        return "text-red-500";
      case "Neutral":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (score === 3) return "bg-gradient-to-r from-yellow-400 to-orange-500";
    return "bg-gradient-to-r from-red-400 to-pink-500";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-400 via-purple-400 to-pink-400 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Floating candies background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-40 drop-shadow-lg">
            🍭
          </div>
          <div className="absolute top-32 right-20 text-5xl animate-bounce delay-100 opacity-40 drop-shadow-lg">
            🍬
          </div>
          <div className="absolute bottom-20 left-32 text-7xl animate-bounce delay-200 opacity-40 drop-shadow-lg">
            🍰
          </div>
          <div className="absolute bottom-40 right-10 text-6xl animate-bounce delay-300 opacity-40 drop-shadow-lg">
            🧁
          </div>
          <div className="absolute top-1/2 left-1/4 text-5xl animate-bounce delay-150 opacity-40 drop-shadow-lg">
            🍫
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10 relative">
          <div className="inline-block mb-4 transform hover:scale-110 transition-transform duration-300">
            <div className="text-8xl drop-shadow-2xl filter">🍬</div>
          </div>
          <h1 className="text-6xl font-bold font-fredoka text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] tracking-wide">
            Candy Review
          </h1>
          <p className="text-2xl font-quicksand font-bold text-white/90 drop-shadow-md">
            Sweet AI-powered sentiment analysis ✨
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 mb-8 border-4 border-white/50 relative overflow-hidden transform transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Input Section */}
            <div>
              <label
                htmlFor="review"
                className="block text-xl font-fredoka font-bold text-purple-600 mb-4 ml-2"
              >
                Enter Your Game Review
              </label>
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <textarea
                  id="review"
                  rows={4}
                  className="relative w-full px-6 py-5 bg-white border-2 border-purple-100 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 resize-none font-quicksand text-lg text-gray-700 placeholder-gray-400 shadow-inner transition-all duration-200 outline-none"
                  placeholder="E.g., This game is absolutely amazing! I love playing it every day... 🎉"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-linear-to-b from-pink-400 to-pink-600 text-white font-fredoka font-bold text-2xl py-5 px-8 rounded-2xl shadow-[0_6px_0_rgb(219,39,119)] active:shadow-none active:translate-y-1.5 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="flex items-center justify-center gap-3 relative z-10">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-7 w-7 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing Magic... ✨
                  </>
                ) : (
                  <>
     
                    Analyze Review
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="text-red-600 font-quicksand font-bold text-lg">
                  {error}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {prediction && (
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 space-y-8 animate-fade-in border-4 border-white/50 relative overflow-hidden">
            {/* Sparkle effects */}

            <div className="absolute bottom-6 left-6 text-4xl animate-pulse delay-100">
              ⭐
            </div>

            <h2 className="text-4xl font-fredoka font-bold text-center bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-8 drop-shadow-sm">
              Analysis Results
            </h2>

            {/* Score Display */}
            <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-linear-to-r from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-100 shadow-inner gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm font-quicksand font-bold text-purple-400 uppercase tracking-wider mb-2">
                  Predicted Score
                </p>
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="text-7xl font-fredoka font-bold text-purple-600 drop-shadow-sm">
                    {prediction.predicted_score}
                  </span>
                  <span className="text-4xl font-fredoka text-purple-300">
                    /5
                  </span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm font-quicksand font-bold text-purple-400 uppercase tracking-wider mb-2">
                  Sentiment
                </p>
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-purple-100">
                  <p
                    className={`text-3xl font-fredoka font-bold ${getSentimentColor(
                      prediction.sentiment
                    )}`}
                  >
                    {prediction.sentiment === "Positive" && "😊 "}
                    {prediction.sentiment === "Negative" && "😞 "}
                    {prediction.sentiment === "Neutral" && "😐 "}
                    {prediction.sentiment}
                  </p>
                </div>
              </div>
            </div>

            {/* Confidence Distribution */}
            <div>
              <h3 className="text-xl font-fredoka font-bold text-purple-600 mb-6 ml-2">
                Confidence Distribution
              </h3>
              <div className="space-y-4">
                {Object.entries(prediction.confidence)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([score, confidence]) => (
                    <div key={score} className="flex items-center gap-4 group">
                      <span className="w-16 text-lg font-fredoka font-bold text-purple-500 bg-purple-50 py-1 px-3 rounded-lg text-center">
                        {score}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden shadow-inner p-1">
                        <div
                          className={`h-full rounded-full ${getScoreColor(
                            Number(score)
                          )} transition-all duration-1000 ease-out relative overflow-hidden`}
                          style={{ width: `${confidence * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                        </div>
                      </div>
                      <span className="w-16 text-sm font-quicksand font-bold text-gray-500 text-right">
                        {(confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Model Info */}
            <div className="pt-6 border-t-2 border-gray-100 text-center">
              <p className="text-sm font-quicksand font-medium text-gray-400">
                🤖 Powered by:{" "}
                <span className="font-bold text-purple-400">
                  {prediction.model}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Example Reviews */}
        <div className="mt-12 text-center relative z-10">
          <p className="text-xl font-fredoka font-bold text-white mb-6 drop-shadow-md">
            🎮 Try these sweet examples:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "This game is absolutely amazing! I love it!",
              "Worst game ever. Too many ads.",
              "It's okay, nothing special but kills time.",
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setReview(example)}
                className="px-6 py-3 text-sm font-quicksand font-bold bg-white/90 text-purple-600 rounded-2xl hover:bg-white hover:scale-105 hover:shadow-lg transition-all duration-200 shadow-md border-b-4 border-purple-200 active:border-b-0 active:translate-y-1"
              >
                {example.substring(0, 30)}...
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
