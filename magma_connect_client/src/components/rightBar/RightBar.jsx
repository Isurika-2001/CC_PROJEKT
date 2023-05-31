import "./rightBar.scss";
import ProfilePic from "../../assets/user.png";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { io } from "socket.io-client";

export const RightBarChat = () => {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [chatUser, setChatUser] = useState(""); // Set initial value to an empty string
  const { currentUser } = useContext(AuthContext);
  const socket = io("http://localhost:8800");

  useEffect(() => {
    // Fetch all connected users from the backend API
    const username = currentUser.username;
    axios
      .get(`http://localhost:8800/api/auth/getConnectedUsers/${username}`)
      .then((res) => {
        setConnectedUsers(res.data);
      })
      .catch((err) => console.log(err));

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [currentUser.username]);

  function handleMessageSend(event) {
    event.preventDefault();
    const messageInput = event.target.elements.message;
    const newMessage = messageInput.value.trim();
    if (newMessage !== "") {
      socket.emit("message", {
        content: newMessage,
        sender: currentUser.username,
        receiver: chatUser,
      });
      messageInput.value = "";
    }
  }

  const handleClick = (user) => {
    console.log(user);
    setChatUser(user);
  };

  return (
    <div className="rightbar">
      <div className="whomYouChatWith">
        <div className="heading">
          <h1>Select to chat with</h1>
        </div>
        <div className="chatheads">
          {connectedUsers.map((connectedUser) => (
            <div
              onClick={() => handleClick(connectedUser.entre1)}
              key={connectedUser.entre1}
              className="selectchat"
            >
              <img src={ProfilePic} alt="" />
              <span>{connectedUser.business_name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <span>Chat</span>
          <span className="chatName">{chatUser}</span>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <span>{message.content}</span>
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
