import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 
import Navbar from '../Navbar'; 

const NotFound = () => {
  return (
    <>
      <Navbar />
      
      <div className="not-found-container">
        <div className="terminal-card">
          
          <div className="terminal-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
            <span className="terminal-title" style={{borderRadius:"0.5rem" ,padding:"0.1rem"}}>bash — 80x24</span>
          </div>

        
          <div className="terminal-body">
            <p className="code-line">
              <span className="prompt">root@github:~$</span> 
              <span className="command"> git checkout page-name</span>
            </p>
            <p className="code-line error-text">
              error: pathspec 'page-name' did not match any file(s) known to git.
            </p>
            <p className="code-line">
              <span className="prompt">root@github:~$</span> 
              <span className="command"> echo $ERROR_CODE</span>
            </p>
            <p className="code-line output">404 - Not Found</p>
           
          </div>
        </div>

        <div className="actions">
          <h6 style={{backgroundColor:"#0d1117"}}>This is not the code you are looking for.</h6>
          
        </div>
      </div>
    </>
  );
};

export default NotFound;