import { useState, useEffect } from "react";
// import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./search.scss";

export const GetCustomers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all users with registration status = 1 from the backend API
    const thisUser = currentUser.username
    axios
      .get("http://localhost:8800/api/auth/getConsultations?thisUser=" + thisUser)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleProfile = (username) => {
    // go to the target profile
  };

  const handleClickChat = (username) => {
    // handle click chat
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const username = user.username.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      username.includes(lowerSearchTerm)
    );
  });

  return (
    <div className="Home">
      <div className="searchBar">
        <input type="text" placeholder="Search" onChange={handleSearch} />
      </div>
      {filteredUsers.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="connectBtn"
                  onClick={() => handleClickChat(user.username)}
                >
                  Chat
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Payment amount : </span>
                <span className="data">{user.amount}</span>
              </span>
              <span>
                <span className="label">Hired Date : </span>
                <span className="data">{user.date}</span>
              </span>
              <span>
                <span className="label">Description : </span>
                <span className="data">{user.description}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};