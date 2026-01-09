import React from "react";
import "./Following.css";
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

function Following() {

    const [user, setUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);


    const { CurrentUser, setCurrentUser } = useAuth();

    const navigate = useNavigate();

    const { username } = useParams();



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:3000/profile/${username}/repos`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });

                setUser(res.data.user);

            } catch (err) {
                console.error("Error fetching profile:", err);

            }
        };

        fetchProfile();
    }, [username]);


    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/profile/${username}/following`
                );

                if (res.data.success) {
                    setFollowing(res.data.following);
                }
            } catch (err) {
                console.error("Error fetching following:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowing();
    }, [username]);



    const isCurrentUser = user?._id === CurrentUser;


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
                            <h2 className="name">{user.name ? user.name : "prashant chadar"}</h2>
                            <h2 className="username" style={{ backgroundColor: "#0d1117" }}>{user.username}</h2>
                            <p className="bio">{user.bio ? user.bio : "i am a web devloper persuing btech in cse "}</p>
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
                        <h3 className="section-title">Following</h3>

                        {loading ? (
                            <p className="empty-text" style={{backgroundColor:"#0d1117"}}>Loading...</p>
                        ) : following.length === 0 ? (
                            <p className="empty-text" style={{backgroundColor:"#0d1117"}}>Not following anyone</p>
                        ) : (
                            <div className="following-grid" style={{backgroundColor:"#0d1117"}}>
                                {following.map((fUser) => (
                                    <div
                                        key={fUser._id}
                                        className="following-card"
                                    >
                                        <div className="card-left" style={{backgroundColor:"#0d1117"}}>
                                            <div className="avatar-circle">
                                                <PersonIcon size={32} style={{backgroundColor:"#0d1117"}}/>
                                            </div>

                                            <div className="card-info" >
                                                <span className="card-username" style={{backgroundColor:"#0d1117"}}>{fUser.username}</span>

                                            </div>
                                        </div>

                                        <button className="view-btn"  onClick={() => navigate(`/profile/${fUser.username}`)}>View</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>



                    <div className="pro-footer">
                        <UserFooter />
                    </div>

                </div>

            </div>
        </>
    );
}

export default Following;
