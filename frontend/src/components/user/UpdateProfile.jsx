import React from "react";
import "./Profile.css";
import ProfileSubNavbar from "./ProfileSubNavbar";
import UserFooter from './UserFooter'
import {
  PersonIcon,
  PencilIcon,
  MailIcon
} from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";

function UpdateProfile() {
    const navigate = useNavigate();
  return (
    <>
      <ProfileSubNavbar />

      <div className="main">
        <div className="pro-left">
          <div className="profile-card">

            <div className="profile-avatar" style={{ backgroundColor: "#0d1117" }}>
              <PersonIcon size={80} style={{ backgroundColor: "#0d1117" }} />
            </div>

            <h2 className="profile-username" style={{ backgroundColor: "#0d1117" }}>Username</h2>

            <div className="profile-email">
              <MailIcon size={16} style={{ backgroundColor: "#0d1117" }} />
              <span style={{ backgroundColor: "#0d1117" }}>username@email.com</span>
            </div>

            <button className="edit-profile-btn" style={{ backgroundColor: "#0d1117" }} onClick={()=>navigate("/profile/updateprofile")}>
              <PencilIcon size={16} style={{ backgroundColor: "#0d1117" }} />
              Edit profile
            </button>
          </div>
        </div>

        <div className="pro-right">
          <div className="sub-right">           
            <UpdateProfileForm/>
          </div>

          <div className="pro-footer">
            <UserFooter />
          </div>
          
        </div>

      </div>
    </>
  );
}

export default UpdateProfile;
