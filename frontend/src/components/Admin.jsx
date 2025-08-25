import React, { useEffect, useState } from "react";
import { API } from "../api";
import "./Admin.css"; // Import the CSS file

export default function Admin() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await API.get("/admin/urls");
        setUrls(res.data);
      } catch (error) {
        alert("Error fetching URLs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel – URL Analytics</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : urls.length === 0 ? (
        <p className="no-data">No URLs found</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Original URL</th>
                <th>Clicks</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a
                      href={`http://localhost:8000/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="short-link"
                    >
                      {`http://localhost:8000/${url.shortCode}`}
                    </a>
                  </td>
                  <td className="truncate">{url.longUrl}</td>
                  <td>{url.clicks}</td>
                  <td>{new Date(url.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
