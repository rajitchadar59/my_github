import React from "react";
import "./UserFooter.css";
import { MarkGithubIcon } from "@primer/octicons-react";

function UserFooter() {
  return (
    <div className="userfooter">

      <div className="userfooter-left">
        <MarkGithubIcon size={28} style={{backgroundColor:"#0d1117"}}/>
        <span style={{backgroundColor:"#0d1117"}}>© 2025 GitHub, Inc.</span>
      </div>

      <div className="userfooter-right">

        <div className="userfooter-links">
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

export default UserFooter;
