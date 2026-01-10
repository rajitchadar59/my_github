import React, { useState, useEffect } from "react";
import "./StarredRepo.css";
import ProfileSubNavbar from "../user/ProfileSubNavbar";
import UserFooter from '../user/UserFooter';
import axios from "axios";
import { PersonIcon, PencilIcon, MailIcon ,LinkIcon} from "@primer/octicons-react";
import { StarIcon } from "@primer/octicons-react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext"
import { useNavigate } from "react-router-dom";
import server from "../../environment"

function StarredRepo() {
    const [searchText, setSearchText] = useState("");
    const [repos, setRepos] = useState([]); 
    const [filteredRepos, setFilteredRepos] = useState([]); 
    const [starredMap, setStarredMap] = useState({});
    const { CurrentUser, setCurrentUser } = useAuth();
    const [user, setUser] = useState({});

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
                } catch (err) {
                    console.error("Error fetching profile:", err);
    
                }
            };
    
            fetchProfile();
        }, [username]);


    
        const userId = localStorage.getItem("userId");
        const isCurrentUser = user?._id === CurrentUser;

        useEffect(() => {
        const fetchStarredRepos = async () => {
            try {

                 const token = localStorage.getItem("token");
                 const res = await axios.get(`${server}/profile/${username}/starred`,
                    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
                );

                if (res.data.success) {
                    setRepos(res.data.repos);
                    console.log(res.data.repos);
                    setFilteredRepos(res.data.repos);

                    const map = {};
                    res.data.repos.forEach(repo => {
                        map[repo._id] = true;
                    });
                    setStarredMap(map);
                }
            } catch (err) {
                console.error("Error fetching starred repos:", err);
            }
        };

        fetchStarredRepos();
    }, [username]);

   
    const handleSearch = () => {

        if (searchText.trim() === "") {
            setFilteredRepos(repos);
            return;
        }
        const filtered = repos.filter(repo =>
            repo.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRepos(filtered);
    };

    
    const handleStar = async (repoId) => {

        if (!isCurrentUser) return;
        try {
            const currentStar = starredMap[repoId] || false;

            await axios.post(`${server}/repo/star`, {
                userId,
                repoId,
                star: !currentStar
            });

       
            setStarredMap(prev => ({
                ...prev,
                [repoId]: !currentStar
            }));

         
            if (currentStar) {
                setRepos(prev => prev.filter(repo => repo._id !== repoId));
                setFilteredRepos(prev => prev.filter(repo => repo._id !== repoId));
            }

        } catch (err) {
            console.error("Error starring repo:", err);
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
            <h2 className="name">{user.name?user.name:""}</h2>
            <h2 className="username" style={{ backgroundColor: "#0d1117" }}>{user.username}</h2>
            <p className="bio">{user.bio?user.bio:""}</p>
            <span className="email" style={{ backgroundColor: "#0d1117" }}><LinkIcon size={16}  style={{ backgroundColor: "#0d1117" }}/>{user.linkedin?user.linkedin:"linkedin.com"}</span>
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
                    <div className="starred-up-right">
                        <div className="starred-repo-topbar">
                            <input
                                type="text"
                                placeholder="Find a repository..."
                                className="starred-repo-search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />

                            <button
                                className="starred-repo-search-btn"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>

                        <div className="starred-repo-list">
                            {filteredRepos.map((repo) => (
                                <div className="starred-repo-row" key={repo._id} onClick={() => navigate(`/repo/${repo.owner.username}/${repo.name}`)}>
                                    <div style={{ backgroundColor: "#0d1117" ,cursor:"pointer" }}>
                                        <span className="starred-repo-name" style={{ marginRight: "1rem" }}>
                                            {repo.name}
                                        </span>
                                        <span className="repo-type">{repo.visibility ? "Public" : "Private"}</span>
                                    </div>


                                    {isCurrentUser && 

                                    <button
                                        className="starred-star-btn"
                                        onClick={() => handleStar(repo._id)}
                                    >
                                        <StarIcon
                                            fill={starredMap[repo._id] ? "#f1c40f" : "#ccc432ff"}
                                            style={{ backgroundColor: "#0d1117" }}
                                        />
                                    </button>

                                   }
                                   
                                </div>
                            ))}
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

export default StarredRepo;
