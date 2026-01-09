import React from "react";
import "./Footer.css";
import { MarkGithubIcon } from "@primer/octicons-react";

function Footer() {
  return (
    <div className="footer">

      <div className="footer-left">
        <MarkGithubIcon size={28} />
        <span>© 2025 GitHub, Inc.</span>
      </div>

      <div className="footer-right">

        <div className="footer-links">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Security</a>
        <a href="#">Status</a>
        <a href="#">Community</a>
        <a href="#">Docs</a>
        <a href="#">Contact</a>
        <a href="#">Manage cookies</a>
        <a href="#" className="footer-center">Do not share my personal information</a>
      </div>
        
      </div>
    </div>
  );
}

export default Footer;
