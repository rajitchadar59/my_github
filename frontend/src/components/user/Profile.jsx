import React from "react";
import "./Profile.css";
import ProfileSubNavbar from "./ProfileSubNavbar";
import { useState } from "react";
import { useEffect } from "react";
import UserFooter from './UserFooter'
import axios from 'axios'
import {
  PersonIcon,
  PencilIcon,
  MailIcon,
  LinkIcon,
  PeopleIcon,
  PersonAddIcon
} from "@primer/octicons-react";
import { LinkExternalIcon } from "@primer/octicons-react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../AuthContext"

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { CurrentUser, setCurrentUser } = useAuth();
  const [user, setUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/profile/${username}`, {
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


  useEffect(() => {
    if (!CurrentUser || !user?._id) return;

    const checkFollow = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/is-following/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsFollowing(res.data.following);
      } catch (err) {
        console.error(err);
      }
    };

    if (CurrentUser !== user._id) {
      checkFollow();
    }
  }, [user, CurrentUser]);




  const isCurrentUser = user?._id === CurrentUser;


  const handleFollow = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/follow",
        { targetUserId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsFollowing(res.data.following);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const fetchFollowStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/profile/${username}/follow-stats`
        );
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFollowStats();
  }, [username, isFollowing]);




  return (
    <>
      <ProfileSubNavbar />

      {isCurrentUser && (
        <button
          style={{
            position: "absolute",
            top: "120px",
            right: "30px",
            color: "#818d9aff",
            border: "1px solid #a4aaafff",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            backgroundColor: "#0d1117"
          }}
          id="logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setCurrentUser(null);
            navigate("/auth");
          }}
        >
          Logout
        </button>
      )}

      <div className="main">
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


              {!isCurrentUser &&

                <div className="follow-bar">
                  <div className="follow-item">
                    
                    <span className="count">{followers}&nbsp;Followers</span>
                   
                  </div>

                  <div className="follow-item">
                   
                    <span className="count">{following} &nbsp;Following</span>
                    
                  </div>
                </div>

              }


              {isCurrentUser ? (
                <button
                  className="edit-profile-btn"
                  onClick={() => navigate("/profile/updateprofile")}
                  style={{ backgroundColor: "#0d1117" }}
                >
                  <PencilIcon size={16} style={{ backgroundColor: "#0d1117" }} /> Edit profile
                </button>
              ) : (
                <button
                  className="edit-profile-btn"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}


            </div>


          </div>
        </div>

        <div className="pro-right">

          <div className="sub-right">

            <p style={{ color: "#c9d1d9", backgroundColor: "#0d1117", marginBottom: "1.5rem" }}>Popular repositories</p>

            <div className="repos">

              {repositories.slice(0, 4).map((repo) => {

                return (

                  <div className="repo-card" key={repo._id}>
                    <a className="repo-name">{repo.name}</a>
                    <span className="repo-type">{repo.visibility ? "Public" : "Private"}</span>
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

export default Profile;
