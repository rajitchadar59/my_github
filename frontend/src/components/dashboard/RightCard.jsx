import React from 'react'
import "./RightCard.css"

function RightCard() {
  return (
    <div className="changelog-card">
          <h3 className="changelog-title">Latest from our changelog</h3>

          <div className="timeline">
            <div className="timeline-item">
              <span className="dot"></span>
              <div style={{backgroundColor:"#0d1117"}}>
                <span className="time">19 hours ago</span>
                <p>Improved performance for GitHub Actions workflows page</p>
              </div>
            </div>

            <div className="timeline-item">
              <span className="dot"></span>
              <div style={{backgroundColor:"#0d1117"}}>
                <span className="time">Yesterday</span>
                <p>
                  Control who can request apps for your organization now in public
                  preview
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <span className="dot"></span>
              <div style={{backgroundColor:"#0d1117"}}>
                <span className="time">4 days ago</span>
                <p>
                  You can now require reviews before closing Dependabot alerts with
                  delegated alert dismissal
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <span className="dot"></span>
              <div style={{backgroundColor:"#0d1117"}}>
                <span className="time">4 days ago</span>
                <p>Copilot memory early access for Pro and Pro+</p>
              </div>
            </div>
          </div>
          
           <div className="timeline-item">
             <a className="view-link">View changelog →</a>
           </div>

         
        </div>
  )
}

export default RightCard
