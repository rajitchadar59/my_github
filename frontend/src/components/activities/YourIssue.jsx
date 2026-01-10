import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import "./YourIssue.css";
import { useNavigate } from "react-router-dom";

import server from "../../environment"

function YourIssue() {
  const { CurrentUser } = useAuth();
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

   const navigate = useNavigate();
   

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${server}/issue/user/${CurrentUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(res.data.issues || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (CurrentUser) fetchIssues();
  }, [CurrentUser]);

  const filteredIssues = filter === "all" ? issues : issues.filter(i => i.status === filter);

  return (
    <div className="yourissue-wrapper">
      <Navbar />
      <div className="yourissue-content">
        <div className="yourissue-header">
          <div className="yourissue-header-left">
            <h2 className="yourissue-page-title">Issues</h2>
            <span className="yourissue-count">{issues.length} Total</span>
          </div>
          <div className="yourissue-tabs">
            {["all", "open", "closed"].map((s) => (
              <button 
                key={s} 
                className={filter === s ? "yourissue-tab active" : "yourissue-tab"} 
                onClick={() => setFilter(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="yourissue-list">
          {loading ? (
            <p className="yourissue-status-msg">Loading issues...</p>
          ) : filteredIssues.length === 0 ? (
            <p className="yourissue-status-msg">No issues found.</p>
          ) : (
            filteredIssues.map((issue) => (
              <div className="yourissue-item" key={issue._id}>
                <div className="yourissue-item-left">
                  <span className="yourissue-label">TITLE</span>
                  <h4 className="yourissue-title">{issue.title}</h4>
                  <span className="yourissue-label">DESCRIPTION</span>
                  <p className="yourissue-description">{issue.description}</p>
                </div>
                <div className="yourissue-item-right">
                  <div className="yourissue-meta-group">
                    <span className="yourissue-label">REPOSITORY</span>
                    <p className="yourissue-repo-name" onClick={() => navigate(`/repo/${issue.repository.owner.username}/${issue.repository.name}`)}>{issue.repository?.name || "N/A"}</p>
                  </div>
                  <div className="yourissue-meta-group">
                    <span className="yourissue-label">STATUS</span>
                    <span className={`yourissue-status ${issue.status}`}>
                      {issue.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default YourIssue;