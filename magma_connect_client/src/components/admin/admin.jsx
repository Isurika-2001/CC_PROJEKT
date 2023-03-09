import { useState, useEffect } from "react";
import axios from "axios";
import "./admin.scss";

export const UserRequests = () => {
  return (
    <div className="Home">
      <h2>User Registration Requests</h2>
    </div>
  );
};

export const StartupRequests = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getStartupRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username) => {
    // Update the user's registration status to 1
    axios
      .put(`http://localhost:8800/api/admins/approveRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  const handleDecline = (username) => {
    // Delete the user from the database
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() => handleApprove(user.username)}
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Phone No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">NIC : </span>
                <span className="data">{user.nic}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EntreprenureRequests = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getEntreprenureRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username) => {
    // Update the user's registration status to 1
    axios
      .put(`http://localhost:8800/api/admins/approveRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  const handleDecline = (username) => {
    // Delete the user from the database
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() => handleApprove(user.username)}
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
            <span>
                <span className="label">Phone No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Address : </span>
                <span className="data">{user.address}</span>
              </span>
              <span>
                <span className="label">Category : </span>
                <span className="data">{user.category}</span>
              </span>
              <span>
                <span className="label">Business Name : </span>
                <span className="data">{user.business_name}</span>
              </span>
              <span>
                <span className="label">Business Registration No : </span>
                <span className="data">{user.reg_no}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ConsultantRequests = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getConsultantRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username) => {
    // Update the user's registration status to 1
    axios
      .put(`http://localhost:8800/api/admins/approveRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  const handleDecline = (username) => {
    // Delete the user from the database
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() => handleApprove(user.username)}
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
            <span>
                <span className="label">Phone No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Qualifications : </span>
                <span className="data">{user.qualification}</span>
              </span>
              <span>
                <span className="label">Consultation Fee Per Session : </span>
                <span className="data">{user.fee}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DistributorRequests = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getDistributorRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username) => {
    // Update the user's registration status to 1
    axios
      .put(`http://localhost:8800/api/admins/approveRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  const handleDecline = (username) => {
    // Delete the user from the database
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`)
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() => handleApprove(user.username)}
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
            <span>
                <span className="label">Phone No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Driving License No : </span>
                <span className="data">{user.drl_no}</span>
              </span>
              <span>
                <span className="label">Type of the Vehicle : </span>
                <span className="data">{user.vehicle_type}</span>
              </span>
              <span>
                <span className="label">Vehicle No : </span>
                <span className="data">{user.vehicle_no}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
