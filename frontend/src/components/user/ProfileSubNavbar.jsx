import React from "react";
import "./ProfileSubNavbar.css";
import {
  BookIcon,
  RepoIcon,
  StarIcon,
  PersonIcon
} from "@primer/octicons-react";
import Navbar from "../Navbar";

import { useParams } from "react-router-dom";



import { useNavigate } from "react-router-dom";
function ProfileSubNavbar() {
   const { username } = useParams();
   const navigate = useNavigate();
   const currentUsername = localStorage.getItem("username");
   const isCurrentUser = currentUsername === username;
  
  return (
    <>
    <Navbar/>
    <div className="profile-subnav">
      <div
        className="subnav-item"
        onClick={() => navigate(`/profile/${username}`)}
      >
        <BookIcon size={16} />
        <span className="subnav-text">Overview</span>
      </div>

      <div
        className="subnav-item"
        onClick={() => navigate(`/profile/${username}/repos`)}
      >
        <RepoIcon size={16} />
        <span className="subnav-text">Repositories</span>
      </div>

      <div
        className="subnav-item"
        onClick={() => navigate(`/profile/${username}/starred`)}
      >
        <StarIcon size={16} />
        <span className="subnav-text">Starred</span>
      </div>


      <div
        className="subnav-item"
        onClick={() => navigate(`/profile/${username}/following`)}
      >
        <PersonIcon size={16} />
        <span className="subnav-text">Following</span>
      </div>

    </div>

    </>
  );
}

export default ProfileSubNavbar;
