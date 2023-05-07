import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./search.scss";

export const Entrepreneur = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all users with registration status = 1 from the backend API
    axios
      .get("http://localhost:8800/api/auth/getEntreprenures")
      .then((res) => {
        // Filter out the current user's information from the fetched data
        const filteredData = res.data.filter(
          (user) => user.username !== currentUser.username
        );
        setUsers(filteredData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleConnect = async (e, username, currentUsername) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8800/api/auth/connectEntr/${username}/${currentUsername}`
      );
      console.log("Successfully added to database.");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const business_name = user.business_name.toLowerCase();
    const category = user.category.toLowerCase();
    const address = user.address.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      business_name.includes(lowerSearchTerm) ||
      category.includes(lowerSearchTerm) ||
      address.includes(lowerSearchTerm)
    );
  });

  return (
    <div className="Home">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by business category, name, or address "
          onChange={handleSearch}
        />
      </div>
      {filteredUsers.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.business_name}</h2>
              <div className="right">
                <button className="connectBtn">Connect</button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Business Name : </span>
                <span className="data">{user.business_name}</span>
              </span>
              <span>
                <span className="label">Category : </span>
                <span className="data">{user.category}</span>
              </span>
              <span>
                <span className="label">Address : </span>
                <span className="data">{user.address}</span>
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

export const Consultant = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users with registration status = 1 from the backend API
    axios
      .get("http://localhost:8800/api/auth/getConsultants")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleToken = async (token, user) => {
    try {
      const amount = user.fee;
      const username = currentUser.username;
      const const_id = user.username;
      const { name, description } = user;

      await axios.post("http://localhost:8800/api/auth/consultationPayment", {
        token,
        amount,
        name,
        username,
        const_id,
        description,
      });

      console.log("Payment success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const fee = user.fee;
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      name.includes(lowerSearchTerm) || fee.toString().includes(lowerSearchTerm)
    );
  });

  return (
    <div className="Home">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by consultant name, or consultant fee"
          onChange={handleSearch}
        />
      </div>
      {filteredUsers.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <StripeCheckout
                  locale="en"
                  className="hireBtn"
                  stripeKey="pk_test_51MjHDhIEmwpzpx2CznjamGPiR01TA7FIV9TJyvlDFMPLMcwJvpZLTeU0YX3uknfaJ16v6Yzr7pABzqY1WeIAIS4g007Do8qbJI"
                  amount={user.fee * 100}
                  currency="LKR"
                  name={user.name}
                  description={`Pay LKR ${user.fee}`}
                  token={(token) => handleToken(token, user)}
                >
                  <button className="btnHire" type="button">
                    Hire
                  </button>
                </StripeCheckout>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Qualifications : </span>
                <span className="data">{user.qualification}</span>
              </span>
              <span>
                <span className="label">Consultation Fee Per Session : </span>
                <span className="data">LKR</span>
                <span className="data">{user.fee}</span>
              </span>
              <span>
                <span className="label">Institute : </span>
                <span className="data">{user.institute}</span>
              </span>
              <span>
                <span className="label">Experiences : </span>
                <span className="data">{user.experiences}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
