import { useState, useEffect } from "react";
// import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";
import "./search.scss";

export const GetCustomers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all users with registration status = 1 from the backend API
    axios
      .get("http://localhost:8800/api/auth/getEntreprenures")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleProfile = (username) => {
    // go to the target profile
  };

  const handleHire = (username) => {
    // sent an request to the target entrepreneur
    // axios
    //   .put(`http://localhost:8800/api/admins/declineRequests/${username}`)
    //   .then((res) => {
    //     console.log(res.data.message);
    //     // Remove the user from the list
    //     setUsers(users.filter((user) => user.username !== username));
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const business_name = user.business_name.toLowerCase();
    const category = user.category.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      business_name.includes(lowerSearchTerm) ||
      category.includes(lowerSearchTerm)
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
              <h2 className="left">{user.business_name}</h2>
              <div className="right">
                <button
                  className="profileBtn"
                  onClick={() => handleProfile(user.username)}
                >
                  Profile
                </button>
                <button
                  className="hireBtn"
                  onClick={() => handleHire(user.username)}
                >
                  Connect
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Category : </span>
                <span className="data">{user.category}</span>
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