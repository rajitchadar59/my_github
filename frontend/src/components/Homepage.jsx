import React from "react";
import {
  MarkGithubIcon,
  RepoIcon,
  StarIcon,
  PeopleIcon,
  ZapIcon,
} from "@primer/octicons-react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="bg-glow"></div>

    
      <nav className="home-nav">
        <div className="nav-left">
          <MarkGithubIcon size={32} />
          <span className="brand-text">MyGitHub</span>
        </div>
        <div className="nav-right">
          <button className="btn ghost-blue" onClick={()=>navigate('/auth')}>Sign in</button>
          <button className="btn ghost-blue" onClick={()=>navigate('/signup')}>Sign up</button>
        </div>
      </nav>

     
      <section className="hero">
        <span className="badge">v2.0 • Developer Platform</span>
        <h1>
          Build software,
          <span className="highlight">together.</span>
        </h1>
        <p>
          Host code, collaborate globally, and deploy faster than ever.
        </p>
        <div className="hero-actions">
          <button className="btn ghost-blue">Get started</button>
          <button className="btn  ghost-blue">Explore</button>
        </div>
      </section>


  
      <section className="showcase">
        <div className="window-mockup">
          <div className="window-header">
            <div className="window-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="window-title">main.js — my-project</div>
          </div>
          <div className="window-body">
            <code className="code-line">
              <span className="purple">const</span>{" "}
              <span className="blue">platform</span> ={" "}
              <span className="orange">"MyGitHub"</span>;
            </code>
            <code className="code-line">
              <span className="purple">function</span>{" "}
              <span className="blue">deploy</span>() {"{"}
            </code>
            <code className="code-line indent">
              <span className="blue">console</span>.<span >log</span>(
              <span className="orange">"Deploying..."</span>);
            </code>
            <code className="code-line">{"}"}</code>
          </div>
        </div>
        <div className="showcase-text">
          <h2>Code with confidence</h2>
          <p>
            Manage repositories, review pull requests, and deploy projects using a clean and developer-first interface.
          </p>
        </div>
      </section>

  
      <section className="stats">
        <div>
          <strong>10k+</strong>
          <span>Repositories</span>
        </div>
        <div>
          <strong>6k+</strong>
          <span>Developers</span>
        </div>
        <div>
          <strong>25k+</strong>
          <span>Stars</span>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="icon-circle icon-blue"><RepoIcon size={22} /></div>
          <h3>Repositories</h3>
          <p>Unlimited public & private repositories.</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle icon-purple"><StarIcon size={22} /></div>
          <h3>Stars</h3>
          <p>Bookmark and grow amazing projects.</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle icon-green"><PeopleIcon size={22} /></div>
          <h3>Community</h3>
          <p>Collaborate with developers worldwide.</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle icon-yellow"><ZapIcon size={22} /></div>
          <h3>CI / CD</h3>
          <p>Automate build & deployment workflows.</p>
        </div>
      </section>



      <footer className="home-footer">
        © 2025 MyGitHub · Built for developers
      </footer>
    </div>
  );
}
