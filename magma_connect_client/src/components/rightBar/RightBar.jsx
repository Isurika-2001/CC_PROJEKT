import "./rightBar.scss";
import ProfilePic from "../../assets/user.png";
import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export const RightBarChat = () => {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all connected users from the backend API
    const username = currentUser.username;
    axios
      .get(`http://localhost:8800/api/auth/getConnectedUsers/${username}`)
      .then((res) => {
        setConnectedUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
          {connectedUsers.map((connectedUser) => (
            <div key={connectedUser.entre1} className="selectchat">
              <img src={ProfilePic} alt="" />
              <span>{connectedUser.business_name}</span>
            </div>
          ))}
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
