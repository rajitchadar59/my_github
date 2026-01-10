import React from "react";
import "./Navbar.css"
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import {
  MarkGithubIcon,
  PlusIcon,
  SearchIcon,
  CopilotIcon,
  PlusCircleIcon,
  RepoIcon,
  RepoCloneIcon,
  CodespacesIcon,
  FileIcon,
  OrganizationIcon,
  ProjectIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  BellIcon,
  PersonIcon,
  HomeIcon,
  CommentDiscussionIcon,
  TelescopeIcon,
  PackageIcon,
  WorkflowIcon
} from "@primer/octicons-react";

import { ThreeBarsIcon } from '@primer/octicons-react'



import { useState, useEffect } from "react";
import axios from 'axios'

import server from "../environment"

export default function Navbar() {
  const [open, setopen] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const [suggestedRepositories, setsuggestedRepositories] = useState([]);
  const [searchResult, setsearchResult] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchSuggestedRepositories = async () => {
      try {
        const res = await axios.get(`${server}/repo/all`);
        setsuggestedRepositories(res.data);


      } catch (err) {
        console.error("Error while featching repositories", err);
      }

    }

    fetchSuggestedRepositories();

  }, []);


  useEffect(() => {
    if (searchQuery == "") {
      setsearchResult(suggestedRepositories);
    }
    else {
      const filteredRepo = suggestedRepositories.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setsearchResult(filteredRepo);
    }

  }, [searchQuery, suggestedRepositories]);



  return (
    <nav className="navbar">


      <div className="nav-left">
        <ThreeBarsIcon size={28} style={{ border: "1px solid #9198A1", borderRadius: "0.5rem" }} onClick={() => setopen(!open)} />
        <Link to="/" style={{ textDecoration: "none", color: "#9198A1" }}>
          <MarkGithubIcon size={32} />
        </Link>
        <span className="nav-title">Dashboard</span>
      </div>



      {open && (
        <div className="sidebar-overlay" onClick={() => setopen(false)}>
          <div className="sidebar-container" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <MarkGithubIcon size={32} />
              <button className="close-btn" onClick={() => setopen(false)}>×</button>
            </div>

            <div className="sidebar-content">
              <div className="sidebar-links">
                <div className="sidebar-item active" onClick={() => { navigate("/dashboard"); setopen(false) }}>
                  <HomeIcon size={20} /> <span>Home</span>
                </div>
                <div className="sidebar-item" onClick={() => { navigate("/yourissue"); setopen(false) }}>
                  <IssueOpenedIcon size={20} /> <span>Issues</span>
                </div>
                <div className="sidebar-item">
                  <GitPullRequestIcon size={20} /> <span>Pull requests</span>
                </div>
                <div className="sidebar-item" onClick={() => { navigate(`/profile/${username}/repos`); setopen(false) }}>
                  <RepoIcon size={20} /> <span>Repositories</span>
                </div>
                <div className="sidebar-item">
                  <ProjectIcon size={20} /> <span>Projects</span>
                </div>
                <div className="sidebar-item" onClick={() => navigate(`/notification`)}><BellIcon size={20} />Notification</div>

                <div className="sidebar-item">
                  <CommentDiscussionIcon size={20} /> <span>Discussions</span>
                </div>
                <div className="sidebar-item">
                  <CodespacesIcon size={20} /> <span>Codespaces</span>
                </div>
                <div className="sidebar-item">
                  <CopilotIcon size={20} /> <span>Copilot</span>
                </div>

                <hr className="sidebar-divider" />

                
                <div className="sidebar-item" onClick={() => navigate("/createrepo")}>
                  <RepoIcon size={20} /> <span>New repository</span>
                </div>
                <div className="sidebar-item" onClick={() => navigate("/createissue")}>
                  <PlusCircleIcon size={20} /> <span>New issue</span>
                </div>

                <hr className="sidebar-divider" />

                <div className="sidebar-item">
                  <TelescopeIcon size={20} /> <span>Explore</span>
                </div>
                <div className="sidebar-item">
                  <PackageIcon size={20} /> <span>Marketplace</span>
                </div>
                <div className="sidebar-item">
                  <WorkflowIcon size={20} /> <span>MCP registry</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}





      <div className="nav-right">

        <div className="search-box">
          <SearchIcon size={16} />

          <input type="text" placeholder="search" value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)} />

          {searchQuery && (
            <div className="search-dropdown">
              {searchResult.length > 0 ? (
                searchResult.map((repo) => (
                  <div
                    key={repo._id}
                    className="search-item"
                    onClick={() => navigate(`/repo/${repo.owner.username}/${repo.name}`)}
                  >
                    <RepoIcon size={16} />
                    <span>{repo.name}</span>
                  </div>
                ))
              ) : (
                <div className="search-item empty">
                  No repositories found
                </div>
              )}
            </div>
          )}

        </div>

        <Tooltip title="Chat with Copilot" arrow placement="bottom">
          <div className="icon-box">
            <CopilotIcon size={24} />
          </div>
        </Tooltip>

        <span className="left-right-devider" >|</span>

        <div className="btn-group plus-dropdown">

          <Tooltip title="Create new…" arrow placement="bottom">
            <button
              type="button"
              className="btn dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <PlusIcon size={16} />
            </button>
          </Tooltip>

          <ul className="dropdown-menu dark-dropdown">
            <li>
              <a className="dropdown-item" href="/createissue">
                <PlusCircleIcon size={20} />
                <span>New issue</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/createrepo">
                <RepoIcon size={20} />
                <span>New repository</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <RepoCloneIcon size={20} />
                <span>Import repository</span>
              </a>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <a className="dropdown-item" href="#">
                <CodespacesIcon size={20} />
                <span>New codespace</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <FileIcon size={20} />
                <span>New gist</span>
              </a>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <a className="dropdown-item" href="#">
                <OrganizationIcon size={20} />
                <span>New organization</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <ProjectIcon size={20} />
                <span>New project</span>
              </a>
            </li>
          </ul>
        </div>


        <Tooltip title="Your issues" arrow placement="bottom">
          <div className="icon-box"><IssueOpenedIcon size={24} onClick={() => navigate('/yourissue')} /></div>
        </Tooltip>

        <Tooltip title="Your pull requests" arrow placement="bottom">
          <div className="icon-box"><GitPullRequestIcon size={24} /></div>
        </Tooltip>

        <Tooltip title="Repositories" arrow placement="bottom">
          <div className="icon-box" onClick={() => navigate(`/profile/${username}/repos`)}><RepoIcon size={24} /></div>
        </Tooltip>

        <Tooltip title="You have unread notifications" arrow placement="bottom">
          <div className="icon-box" onClick={() => navigate(`/notification`)}><BellIcon size={24} /></div>
        </Tooltip>

        <div className="icon-box" onClick={() => navigate(`/profile/${username}`)}> <PersonIcon size={24} /></div>

      </div>

    </nav>
  );
}
