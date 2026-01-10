import React, { useState, useEffect } from "react";
import {
    RepoIcon,
    ChevronDownIcon,
    SearchIcon,
    CheckIcon,
} from "@primer/octicons-react";
import "./CreateIssue.css";
import axios from "axios";
import Navbar from '../Navbar'
import { useNavigate } from "react-router-dom";
import server from "../../environment"

export default function CreateIssue() {
    const [repos, setrepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [repoOpen, setRepoOpen] = useState(false);
    const [step, setStep] = useState("template");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [searchQuery, setsearchQuery] = useState("");
    const [searchResult, setsearchResult] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const res = await axios.get(`${server}/repo/all`);
                setrepos(res.data);
            } catch (err) {
                console.error("Error while featching repositories", err);
            }

        }

        fetchRepositories();

    }, []);

    useEffect(() => {
        if (searchQuery == "") {
            setsearchResult(repos);
        }
        else {
            const filteredRepo = repos.filter(repo =>
                repo.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setsearchResult(filteredRepo);
        }



    }, [searchQuery, repos]);

    useEffect(() => {
        if (repos.length > 0) {
            setSelectedRepo(repos[0]);
        }
    }, [repos]);


    const handleCreateIssue = async () => {

         if (!title || !desc) {
            alert("Please fill all required fields!");
            return;
        }
        try {
            const res = await axios.post(`${server}/issue/create`, {
                title,
                description: desc,
                repository: selectedRepo._id,
                owner:localStorage.getItem("userId")
            });

            alert(res.data.message);
            navigate("/dashboard")

        } catch (err) {
            console.error("Error while featching repositories", err);
        }
    }



    return (
        <>
            <Navbar />

            <div className="issue-container">
                <div className="issue-page">
                    <h2>Create new issue</h2>


                    <div className="repo-section">
                        <label>
                            Repository <span>*</span>
                        </label>

                        <div
                            className="repo-pill"
                            onClick={() => setRepoOpen(!repoOpen)}

                        >
                            <RepoIcon size={16} style={{ backgroundColor: "#0d1117" }} />
                            <span style={{ backgroundColor: "#0d1117" }}>{selectedRepo ? selectedRepo.name : "Select a repository"}</span>

                            <ChevronDownIcon size={16} style={{ backgroundColor: "#0d1117" }} />
                        </div>

                        {repoOpen && (
                            <div className="repo-dropdown">
                                <div className="repo-search">
                                    <SearchIcon size={16} style={{ backgroundColor: "#0d1117" }} />
                                    <input
                                        placeholder="Search repository"
                                        value={searchQuery}
                                        onChange={(e) => setsearchQuery(e.target.value)}
                                    />
                                </div>

                                {searchResult.slice(0, 5).map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="repo-item"
                                        onClick={() => {
                                            setSelectedRepo(repo);
                                            setRepoOpen(false);
                                            setsearchQuery("");
                                        }}
                                    >
                                        <RepoIcon size={16} style={{ backgroundColor: "#0d1117" }} />
                                        {repo.name}
                                        {repo.name === selectedRepo.name && (
                                            <CheckIcon className="check" size={16} style={{ backgroundColor: "#0d1117" }} />
                                        )}
                                    </div>
                                ))}

                                {searchQuery === "" && repos.length > 5 && (
                                    <div className="repo-hint">
                                        Search to see more repositories
                                    </div>
                                )}
                            </div>
                        )}
                    </div>


                    {step === "template" && (
                        <div className="template-box">
                            <div className="template-title">Templates and forms</div>

                            <div
                                className="template-card"
                                onClick={() => setStep("form")}
                            >
                                <div>
                                    <h3>Blank issue</h3>
                                    <p>Create a new issue from scratch</p>
                                </div>
                                <span style={{ backgroundColor: "#0d1117" }}>→</span>
                            </div>
                        </div>
                    )}


                    {step === "form" && (
                        <div className="issue-form">
                            <div className="field">
                                <label>Title</label>
                                <input
                                    placeholder="Add a title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label>Description</label>
                                <textarea
                                    rows="8"
                                    placeholder="Add a description"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="actions">
                                <button className="btn-primary" onClick={handleCreateIssue}>Create issue</button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => setStep("template")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </>
    );
}
