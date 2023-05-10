import "./rightBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import ProfilePic from "../../assets/user.png";
import { NavLink } from "react-router-dom";
import { React, useState } from "react";

export const RightBarChat = () => {
  const [messages, setMessages] = useState([]);

  function handleMessageSend(event) {
    event.preventDefault();
    const messageInput = event.target.elements.message;
    const newMessage = messageInput.value.trim();
    if (newMessage !== "") {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      messageInput.value = "";
    }
  }

  return (
    <div className="rightbar">
      <div className="whomYouChatWith">
        <div className="heading">
          <h1>Select to chat with</h1>
        </div>

        <div className="chatheads">
          <div className="selectchat">
            <img src={ProfilePic} alt="" />
            <span> Jayodya</span>
          </div>
          <div className="selectchat">
            <img src={ProfilePic} alt="" />
            <span> Josua Gray</span>
          </div>
          <div className="selectchat">
            <img src={ProfilePic} alt="" />
            <span> Isurika</span>
          </div>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat</h2>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <span>{message}</span>
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleMessageSend}>
          <input type="text" name="message" placeholder="Type your message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
