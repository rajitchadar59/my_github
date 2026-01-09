import React from "react";
import Navbar from "../Navbar";
import "./Notifications.css";

function Notifications() {
  return (
    <>
      <Navbar />

      <div className="no-notification-wrapper">
        <h2>No notifications</h2>
        <p>You don’t have any notifications right now.</p>
      </div>
    </>
  );
}

export default Notifications;
