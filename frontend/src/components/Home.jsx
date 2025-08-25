import React, { useState } from "react";
import { API } from "../api";
import "./Home.css"; // Import the CSS file

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return alert("Please enter a URL");
    setLoading(true);
    try {
      const res = await API.post("/shorten", { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (error) {
      alert("Error shortening URL");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">URL Shortener</h1>
      <form className="home-form" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="url-input"
        />
        <button type="submit" className="shorten-btn" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {shortUrl && (
        <p className="shortened-url">
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
