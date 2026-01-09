import React, { useState } from "react";
import {
  LinkIcon,
  MailIcon
} from "@primer/octicons-react";

import "./UpdateProfileForm.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProfileForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      await axios.put(
        "http://localhost:3000/profile/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate(`/profile/${username}`);

    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Profile update failed");
    }
  };

  return (
    <div className="update-form-wrapper">

      <h2 className="form-title">Update Public profile</h2>


      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
      </div>


      <div className="form-group">
        <label>Bio</label>
        <textarea
          name="bio"
          rows="3"
          placeholder="Add a bio"
          value={form.bio}
          onChange={handleChange}
        />
      </div>

   


      <h3 className="section-title">Social profiles</h3>

      <div className="form-group icon-input">
        <LinkIcon size={16} style={{ backgroundColor: "#0d1117" }} />
        <input
          type="url"
          name="linkedin"
          placeholder="linkedin profile link"
          value={form.linkedin}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button className="save-btn" onClick={handleSubmit}>Save</button>
        <button className="cancel-btn" onClick={() => navigate(`/profile/${localStorage.getItem('username')}`)}>Cancel</button>
      </div>
    </div>
  );
}

export default UpdateProfileForm;
