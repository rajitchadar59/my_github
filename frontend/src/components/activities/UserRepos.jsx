import React from "react";
import "./UserRepos.css";
import ProfileSubNavbar from "../user/ProfileSubNavbar";
import UserFooter from '../user/UserFooter'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext"
import axios from 'axios'
import {
    PersonIcon,
    PencilIcon,
    MailIcon,
    LinkIcon,
} from "@primer/octicons-react";

import {
    StarIcon,
    PlusIcon,
    RepoIcon
} from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";

import server from "../../environment"

function UserRepos() {
    const [searchQuery, setsearchQuery] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    const [visibilityFilter, setVisibilityFilter] = useState("All");
    const [starredMap, setStarredMap] = useState({});
    const [user, setUser] = useState({});
    const [repositories, setRepositories] = useState([]);
    const { CurrentUser, setCurrentUser } = useAuth();

    const navigate = useNavigate();

    const { username } = useParams();



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${server}/profile/${username}/repos`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });

                setUser(res.data.user);
                setRepositories(res.data.repositories);
            } catch (err) {
                console.error("Error fetching profile:", err);

            }
        };

        fetchProfile();
    }, [username]);


    const isCurrentUser = user?._id === CurrentUser;


    useEffect(() => {
        if (!isCurrentUser) {
            return;
        }
        const userId = localStorage.getItem("userId");

        const fetchStarredRepos = async () => {
            try {
                const res = await axios.get(
                    `${server}/profile/${username}/starred`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                
                
                if (res.data.success) {
                    const initialStarMap = {};
                    res.data.repos.forEach(repo => {
                        initialStarMap[repo._id] = true;
                    });
                    setStarredMap(initialStarMap);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchStarredRepos();
    }, [isCurrentUser]);




    useEffect(() => {
        let filtered = repositories;


        if (searchQuery !== "") {
            filtered = filtered.filter(repo =>
                repo.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }


        if (visibilityFilter === "Public") {
            filtered = filtered.filter(repo => repo.visibility === true);
        } else if (visibilityFilter === "Private") {
            filtered = filtered.filter(repo => repo.visibility === false);
        }

        setsearchResult(filtered);

    }, [searchQuery, visibilityFilter, repositories]);


    const handleVisibilityChange = (e) => {
        setVisibilityFilter(e.target.value);
    };


    const handleStar = async (repoId) => {
        try {
            const userId = localStorage.getItem("userId");
            const currentStar = starredMap[repoId] || false;

            const res = await axios.post(`${server}/repo/star`, {
                userId,
                repoId,
                star: !currentStar
            });

            setStarredMap(prev => ({
                ...prev,
                [repoId]: res.data.starred
            }));

        } catch (err) {
            console.log(err);
        }
    };




    return (
        <>
            <ProfileSubNavbar />

            <div className="repo-main">
                <div className="pro-left">

                    <div className="profile-card">

                        <div className="profile-avatar" style={{ backgroundColor: "#0d1117" }}>
                            <PersonIcon size={80} style={{ backgroundColor: "#0d1117" }} />
                        </div>


                        <div className="lower">
                            <h2 className="name">{user.name ? user.name : ""}</h2>
                            <h2 className="username" style={{ backgroundColor: "#0d1117" }}>{user.username}</h2>
                            <p className="bio">{user.bio ? user.bio : ""}</p>
                            <span className="email" style={{ backgroundColor: "#0d1117" }}><LinkIcon size={16} style={{ backgroundColor: "#0d1117" }} />{user.linkedin ? user.linkedin : "linkedin.com"}</span>
                            <div className="email">
                                <MailIcon size={16} style={{ backgroundColor: "#0d1117" }} />
                                <span style={{ backgroundColor: "#0d1117" }}>{user.email}</span>
                            </div>

                            {isCurrentUser &&
                                <button className="edit-profile-btn" style={{ backgroundColor: "#0d1117" }} onClick={() => navigate("/profile/updateprofile")}>
                                    <PencilIcon size={16} style={{ backgroundColor: "#0d1117" }} />
                                    Edit profile
                                </button>

                            }

                        </div>


                    </div>

                </div>

                <div className="repo-right">

                    <div className="up-right">


                        <div className="repo-topbar">

                            <input
                                type="text"
                                placeholder="Find a repository..."
                                className="repo-search"
                                onChange={(e) => setsearchQuery(e.target.value)}
                            />


                            {isCurrentUser &&

                                <select className="repo-select" onChange={handleVisibilityChange}>
                                    <option value="All">All</option>
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                </select>


                            }


                            {isCurrentUser &&
                                <button className="new-btn" onClick={() => navigate("/createrepo")}>
                                    <RepoIcon size={16} style={{ backgroundColor: "#238636", marginRight: "0.2rem" }} />
                                    New
                                </button>

                            }

                        </div>


                        <div className="repo-list">

                            {searchResult.map((repo) => {

                                return (
                                    <div className="repo-row" key={repo._id}>
                                        <div style={{ backgroundColor: "#0d1117" ,cursor:"pointer" }} onClick={() => navigate(`/repo/${username}/${repo.name}`)}>
                                            <span className="repo-name" style={{ marginRight: "1rem" }}>{repo.name}</span>
                                            <span className="repo-type">{repo.visibility ? "Public" : "Private"}</span>
                                        </div>

                                        {isCurrentUser &&

                                            <button className="star-btn" onClick={() => handleStar(repo._id)}>
                                                <StarIcon
                                                    size={16}
                                                    style={{
                                                        backgroundColor: "#0d1117",
                                                        color: starredMap[repo._id] ? "#f1c40f" : "#c9d1d9"
                                                    }}
                                                />
                                                {starredMap[repo._id] ? " Unstar" : " Star"}
                                            </button>

                                        }


                                    </div>
                                );

                            })}

                        </div>
                    </div>


                    <div className="pro-footer">
                        <UserFooter />
                    </div>

                </div>

            </div>
        </>
    );
}

export default UserRepos;
