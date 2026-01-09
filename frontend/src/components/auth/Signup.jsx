import React from 'react'
import { Box, Button } from "@primer/react";
import { PageHeader } from "@primer/react/drafts";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";
import { useAuth } from '../../AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { MarkGithubIcon } from "@primer/octicons-react";

function Signup() {

  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const { CurrentUser, setCurrentUser } = useAuth();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
            alert("Please fill all required fields!");
            return;
        }

    try {
      setloading(true);
      const res = await axios.post("http://localhost:3000/signup", {
        email: email,
        password: password,
        username: username
      })

      const token = res.data.token;
      const userId = res.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);
      setloading(false);

      navigate("/");

    } catch (err) {
      console.log(err);
      console.error(err);
      alert("Signup Failed!")
      setloading(false);
    }
  }



  return (

    <>

      <div className="allwarapper">

        <nav className="home-nav">
          <div className="nav-left">
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <MarkGithubIcon size={32} />
            </Link>
            <span className="brand-text">MyGitHub</span>
          </div>
          <div className="nav-right">
            <button className="btn ghost-blue" onClick={() => navigate('/auth')}>Sign in</button>
          </div>
        </nav>

        <div className="login-wrapper">

          <div className="login-box-wrapper">


            <div
              className="info"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                paddingTop: "20px"
              }}
            >
              <MarkGithubIcon size={32} />
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                Sign up
              </span>
            </div>



            <div className="login-box">
              <div>
                <label className="label">Username</label>
                <input
                  autoComplete="off"
                  name="Username"
                  id="Username"
                  className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">Email address</label>
                <input
                  autoComplete="off"
                  name="Email"
                  id="Email"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required

                />
              </div>

              <div className="div">
                <label className="label">Password</label>
                <input
                  autoComplete="off"
                  name="Password"
                  id="Password"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn ghost-blue-big" disabled={loading} onClick={handleSignup} style={{textAlign:"center"}} >{loading ? "Loading...." : "Signup"}</button>

            </div>

            <div className="pass-box">
              <p>
                Already have an account? <Link to="/auth" style={{ textDecoration: "none" }}>Sign in</Link>
              </p>
            </div>
          </div>
        </div>

      </div>


    </>
  )
}

export default Signup
