import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import axios from "axios";
import Navbar from "../../Navbar";
import "./RepoDetails.css";
import server from "../../../environment"

export default function RepoDetailsPage() {
  const { username, reponame } = useParams();
  const { CurrentUser } = useAuth();
  const navigate = useNavigate();

  const [repo, setRepo] = useState(null);
  const [owner, setOwner] = useState({});
  const [issues, setIssues] = useState([]);
  const [starred, setStarred] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editingIssueId, setEditingIssueId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const [openIssueId, setOpenIssueId] = useState(null);

  const isOwner = CurrentUser === owner._id;

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const repoRes = await axios.get(
          `${server}/profile/${username}/repos`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );

        const repos = repoRes.data.repositories;
        const selectedRepo = repos.find(r => r.name === reponame);

        if (!selectedRepo) return navigate("/notfound");

        setRepo(selectedRepo);
        setOwner(repoRes.data.user);


        if (CurrentUser) {
          try {
            const res = await axios.get(
              `${server}/profile/${localStorage.getItem('username')}/starred`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (res.data.success) {
              const isStarred = res.data.repos.some(
                (r) => r._id === selectedRepo._id
              );
              setStarred(isStarred);
            }
          } catch (err) {
            console.error(err);
          }
        }


        const issuesRes = await axios.get(
          `${server}/issue/all/${selectedRepo._id}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );

        setIssues(issuesRes.data);
        setLoading(false);






      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, reponame, navigate]);


  const handleStar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${server}/repo/star`,
        { userId: CurrentUser, repoId: repo._id, star: !starred },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStarred(!starred);
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${server}/repo/delete/${repo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/profile/${username}`);
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleToggleVisibility = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${server}/repo/toggle/${repo._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRepo({ ...repo, visibility: res.data.repository.visibility });
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDeleteIssue = async (e, issueId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this issue?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${server}/issue/delete/${issueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssues(prev => prev.filter(i => i._id !== issueId));
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleEditClick = (e, issue) => {
    e.stopPropagation();
    setEditingIssueId(issue._id);
    setEditForm({ title: issue.title, description: issue.description });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (issueId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${server}/issue/update/${issueId}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIssues(prev =>
        prev.map(i => (i._id === issueId ? { ...i, ...editForm } : i))
      );

      setEditingIssueId(null);
    } catch (err) {
      console.error(err);
    }
  };



  const handleToggleStatus = async (issue) => {
    const token = localStorage.getItem("token");

    const repoOwnerId = repo.owner?._id?.toString();
    const issueOwnerId = issue.owner?._id?.toString();

    if (CurrentUser !== issueOwnerId && CurrentUser !== repoOwnerId) {
      alert("Only repo owner or issue creator can toggle status");
      return;
    }

    try {
      const res = await axios.put(
        `${server}/issue/toggle/${issue._id}`,
        { userId: CurrentUser },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIssues(prev =>
        prev.map(i =>
          i._id.toString() === issue._id.toString() ? { ...i, status: res.data.status } : i
        )
      );
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };





  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div className="repo-page-wrapper">
      <Navbar />

      <div className="repo-container">
        {/* HEADER */}
        <div className="repo-header fade-in-down">
          <div className="header-content">
            <div className="breadcrumb">
              <span className="user-link" onClick={()=>navigate(`/profile/${owner.username}`)}>{owner.username}</span>
              <span className="divider">/</span>
              <span className="repo-title">{repo.name}</span>
              <span className={`badge ${repo.visibility ? "public" : "private"}`}>
                {repo.visibility ? "Public" : "Private"}
              </span>
            </div>
          </div>

          <div className="header-actions">
            <button
              className={`btn star-btn-deatail ${starred ? "starred" : ""}`}
              onClick={handleStar}
            >
              {starred ? "★ Unstar" : "☆ Star"}
            </button>

            {isOwner && (
              <>
                <button className="btn outline-btn" onClick={handleToggleVisibility}>
                  {repo.visibility ? "🔒 Make Private" : "👁 Make Public"}
                </button>
                <button className="btn danger-btn" onClick={handleDelete}>
                  🗑 Delete
                </button>
              </>
            )}
          </div>
        </div>

        <div className="repo-grid">
         
          <div className="repo-main-deatail fade-in-up">
            <div className="section-header">
              <h3>Issues</h3>
              {CurrentUser && (
                <button
                  className="btn primary-btn small"
                  onClick={() => navigate("/createissue")}
                >
                  + New Issue
                </button>
              )}
            </div>

            <div className="issues-list">
              {issues.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">☕</span>
                  <p>No issues found.</p>
                </div>
              ) : (
                issues.map((issue, index) => (
                  <div
                    className="issue-card"
                    key={issue._id}
                    onClick={() =>
                      setOpenIssueId(openIssueId === issue._id ? null : issue._id)
                    }
                  >
                    <div className={`issue-icon ${issue.status}`}>
                      {issue.status === "closed" ? "✔" : "◉"}
                    </div>

                    <div className="issue-content">
                      {editingIssueId === issue._id ? (
                        <>
                          <p className="edit-label">title</p>
                          <input
                            className="edit-input"
                            name="title"
                            value={editForm.title}
                            onChange={handleEditChange}
                          />
                          <p className="edit-label">description</p>
                          <textarea
                            className="edit-textarea"
                            name="description"
                            value={editForm.description}
                            onChange={handleEditChange}
                          />
                          <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                            <button
                              className="btn primary-btn small"
                              onClick={() => handleEditSave(issue._id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn outline-btn small"
                              onClick={() => setEditingIssueId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="issue-title">{issue.title}</h4>
                          <div className="issue-meta">
                            #{index + 1} opened by{" "}
                            {issue.owner.username || "Anonymous"} •{" "}
                            {issue.status}
                          </div>

                          {openIssueId === issue._id && (
                            <div className="issue-meta">
                              description : <br />
                              {issue.description}
                            </div>
                          )}

                          {(() => {
                            const canEditDelete = CurrentUser === issue.owner?._id?.toString();
                            const canToggle = CurrentUser === issue.owner?._id?.toString() || CurrentUser === repo.owner?._id?.toString();

                            return (
                              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                                {canEditDelete && (
                                  <>
                                    <button className="btn outline-btn small" onClick={(e) => handleEditClick(e, issue)}>Edit</button>
                                    <button className="btn danger-btn small" onClick={(e) => handleDeleteIssue(e, issue._id)}>Delete</button>
                                  </>
                                )}
                                {canToggle && (
                                  <button className="btn outline-btn small" onClick={() => handleToggleStatus(issue)} style={{color:"white"}}>
                                    {issue.status === "open" ? "Close" : "Reopen"}
                                  </button>
                                )}

                              </div>
                            );
                          })()}


                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="repo-sidebar fade-in-right">
            <div className="sidebar-card">
              <h4>Owner</h4>
              <div className="owner-profile">
                <div className="avatar-placeholder">
                  {owner.username?.charAt(0)?.toUpperCase()}
                </div>
                <div className="owner-details">
                  <span className="owner-name">{owner.username}</span>
                  <span className="owner-email">
                    {owner.email || "No public email"}
                  </span>
                </div>
              </div>
            </div>

            <div className="section-card description-card" style={{ marginTop: "1rem" }}>
              <h6>Repository Description</h6>
              <p className="repo-desc-text">
                {repo.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
