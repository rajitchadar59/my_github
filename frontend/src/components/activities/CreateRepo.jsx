import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./CreateRepo.css";
import Navbar from '../Navbar'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const CreateRepo = () => {
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const navigate = useNavigate();

  const handleCreateRepo = async ()=>{
     const userId =  localStorage.getItem("userId");
      if(!userId){
         navigate("/auth");
      }

      try{

        const res = await axios.post("http://localhost:3000/repo/create",{
          name,
          description,
          visibility,
          owner:userId
        });

        alert(`${res.data.message}`);
        navigate("/dashboard");
     }catch(err){

      console.error("error occur : ",err);

     }

  }
  
  return (
    <>
     <Navbar/>
    <div className="create-repo-page">
      <div className="create-repo-container">

        <h4 style={{backgroundColor:"#0d1117"}}>Create a new repository</h4>

        <p className="subtitle">
          Repositories contain a project's files and version history.
          Have a project elsewhere?
          <span className="link"> Import a repository.</span><br />
          Required fields are marked with an asterisk (*).
        </p>

        
        <div className="section">
          

          <div className="section-content">
            <h2>General</h2>

            <label>
              Owner <span>*</span>
            </label>

            <div className="owner-repo">
              <div className="owner-box">{localStorage.getItem('username')}/</div>
             

              <input
                type="text"
                className="repo-input"
                placeholder="Repository name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>

            <p className="hint">
              Great repository names are short and memorable.
              How about <span style={{backgroundColor:"#0d1117"}}>automatic-system</span>?
            </p>

            <label style={{marginBottom:"0.5rem"}}>Description</label>
            <input
              type="text"
              className="repo-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              
            />

            <small style={{marginTop:"0.5rem"}}>0 - 350 characters</small>
          </div>
        </div>

       
        <div className="section">

          <div className="section-content">
            <h2>Configuration</h2>
            <div className="visibility-title">
              <label>
                Choose visibility <span>*</span>
              </label>

              <Tooltip
                title="Choose who can see and commit to this repository"
                arrow
                placement="right"
              >
                <InfoOutlinedIcon className="info-icon" />
              </Tooltip>
            </div>

            <div className="visibility-box">
              
              <label
                className={`radio ${visibility ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility}
                  onChange={() => setVisibility(true)}
                />
                <div style={{backgroundColor:"#0d1117"}}>
                  <strong >Public</strong>
                  <p>Anyone on the internet can see this repository</p>
                </div>
              </label>

             
              <label
                className={`radio ${visibility === false? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility === false}
                  onChange={() => setVisibility(false)}
                />
                <div style={{backgroundColor:"#0d1117"}}>
                  <strong>Private</strong>
                  <p>You choose who can see and commit</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <button className="create-btn" disabled={!name} onClick={handleCreateRepo}>
          Create repository
        </button>

      </div>
    </div>

    
   
    </>
  );
};

export default CreateRepo;

