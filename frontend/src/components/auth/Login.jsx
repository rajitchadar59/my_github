import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { PageHeader } from "@primer/react/drafts";
import { Box, Button } from "@primer/react";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { MarkGithubIcon } from "@primer/octicons-react";

import server from "../../environment"

function Login() {

  const { CurrentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
            alert("Please fill all required fields!");
            return;
        }

    try {
      setloading(true);
      const res = await axios.post(`https://my-github-cd3v.onrender.com/login`, {
        email: email,
        password: password,

      })

      const token = res.data.token;
      const userId = res.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username",res.data.username)
      setCurrentUser(userId);
      setloading(false);

      navigate("/");


    } catch (err) {
      console.error(err);
      alert("Login Failed!")
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
            <button className="btn ghost-blue" onClick={() => navigate('/signup')}>Sign up</button>
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
                Sign in
              </span>
            </div>

            <div className="login-box">
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

              <button className="btn ghost-blue-big" disabled={loading} onClick={handleLogin} style={{textAlign:"center"}} >{loading ? "Loading...." : "Sign in"} </button>

            </div>
            <div className="pass-box">
              <p>
                New to GitHub? <Link to="/signup" style={{ textDecoration: "none" }}>Create an account</Link>
              </p>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Login






