import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  // State to control the visibility of the sidebar
  const [extended, setExtended] = useState(false);

  // Destructure context values for easier access
  const { onSent, previousPrompt, setRecentPrompt, newChat } =
    useContext(Context);

  // Function to load a previous prompt and send it
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* Toggle sidebar visibility */}
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        {/* Button to start a new chat */}
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* Display recent prompts if the sidebar is extended */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {previousPrompt.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Bottom section with additional options */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
