import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  RepoIcon,
  PlusIcon
} from "@primer/octicons-react";
import RightCard from "./RightCard";
import Footer from "../Footer";
import AskAnythingBar from "./AskAnythingBar";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [searchQuery, setsearchQuery] = useState("");
    const [suggestedRepositories, setsuggestedRepositories] = useState([]);
    const [searchResult, setsearchResult] = useState([]);



    const navigate = useNavigate();


  useEffect(() => {
    const fetchSuggestedRepositories = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/repo/all`);
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
    <>
     <Navbar/>
    <div className="dashboard">
     
      <div className="left">
        <div className="left-header">
          <h4 style={{ backgroundColor: "#0d1117", fontSize: "0.9rem " }}>Top repositories</h4>
          <button className="new-btn-dash" onClick={()=>navigate('/createrepo')}>
            <RepoIcon size={16} style={{ color: "#c9d1d9", backgroundColor: "green" }} />
            New
          </button>
        </div>

        <input
          type="text"
          placeholder="Find a repository..."
          className="repo-search"
          onChange={(e)=>setsearchQuery(e.target.value)}
        />

        <div className="repo-list">


          {searchResult.slice(0, 10).map((repo) => {

          return (            
            <div className="repo-item-dash" key={repo._id} onClick={()=>navigate(`/repo/${repo.owner.username}/${repo.name}`)}>
            <RepoIcon size={16} />
            {repo.owner.username}/{repo.name}
          </div>

          );

        })}

        </div>


      </div>

      {/* RIGHT */}
      <div className="right">
   
        <div className="right-main">
          <div className="title">
            <h4 style={{color:"#c9d1d9"}}>Home</h4>
            <AskAnythingBar/>
          </div>
        </div>

    
        <div className="right-sidebar">
          <RightCard />
        </div>
      </div>

    </div>

    <div className="footer">
            <Footer/>
          </div>

     </>
  );
}

export default Dashboard;
