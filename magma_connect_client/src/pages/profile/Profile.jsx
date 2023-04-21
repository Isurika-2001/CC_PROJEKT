import "./profile.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [inputs, setInputs] = useState({
    email: "",
    telephone: "",
    Paddress: "",
    category: "",
    businessName: "",
    regNo: "",
    address: "",
  });

  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [err, setErr] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = () => {
    setIsTyping(true);
    setErr(null);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  useEffect(() => {
    if (currentUser.roll === "startup") {
      axios
        .get(
          `http://localhost:8800/api/auth/getStartupDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
    if (currentUser.roll === "existing") {
      axios
        .get(
          `http://localhost:8800/api/auth/getEntreprenureDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
    if (currentUser.roll === "consultant") {
      axios
        .get(
          `http://localhost:8800/api/auth/getConsultantDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
    if (currentUser.roll === "distributor") {
      axios
        .get(
          `http://localhost:8800/api/auth/getDistributorDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  const userRoll = () => {
    if (currentUser.roll === "existing") {
      return "Entrepreneur";
    } else if (currentUser.roll === "consultant") {
      return "Consultant";
    } else if (currentUser.roll === "customer") {
      return "Customer";
    } else if (currentUser.roll === "startup") {
      return "Startup Entrepreneur";
    } else if (currentUser.roll === "distributor") {
      return "Distributor";
    }
  };

  const switchAcc = () => {
    setShowForm(true);
  };

  const handleForm = () => {
    setShowForm(false);
  };

  const resetInputs = () => {
    setInputs({
      email: "",
      telephone: "",
      Paddress: "",
      category: "",
      businessName: "",
      regNo: "",
      address: "",
    });
  };

  const submitForm = async (e, username) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8800/api/auth/switchRequest/${username}`,
        inputs
      );
      resetInputs();
      setErr("Successfully submitted. Please wait for the approval.");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span className="userName">{currentUser.name}</span>
            <span className="userRoll">{userRoll()}</span>
            {currentUser.roll === "startup" && (
              <>
                <button onClick={switchAcc}>Switch to entreprenure</button>
                {showForm && (
                  <>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={inputs.category}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <input
                        type="text"
                        placeholder="Business Name"
                        name="businessName"
                        value={inputs.businessName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <input
                        type="text"
                        placeholder="Registration Number"
                        name="regNo"
                        value={inputs.regNo}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <input
                        type="text"
                        placeholder="Business Address"
                        name="address"
                        value={inputs.address}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      {err && !isTyping && (
                        <span
                          className="error"
                          style={{
                            color:
                              err ===
                              "Successfully submitted. Please wait for the approval."
                                ? "rgb(0, 172, 95)"
                                : "red",
                          }}
                        >
                          {err}
                        </span>
                      )}
                      <div className="footerN">
                        <button
                          onClick={(e) => submitForm(e, currentUser.username)}
                        >
                          Submit
                        </button>
                        <span onClick={handleForm}>^</span>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
            {currentUser.roll === "existing" && (
              <button>Add new Business</button>
            )}
            {currentUser.roll === "distributor" && (
              <button>Add new Vehicle</button>
            )}
          </div>
        </div>
      </div>
      <div className="userDetails">
        <div className="PInfo">
          <form className="userForm">
            <h2>Personal Information</h2>
            <div className="usual">
              <div className="element">
                <span>Name </span>
                <input type="text" placeholder={currentUser.name} />
              </div>
              <div className="element">
                <span>Email </span>
                <input type="text" placeholder={currentUser.email} />
              </div>
              <div className="element">
                <span>Address </span>
                <input type="text" placeholder={currentUser.address} />
              </div>
              <div className="element">
                <span>Contact Number </span>
                <input type="text" placeholder={currentUser.telephone} />
              </div>
            </div>
            <div className="extra">
              {users.map((user) => (
                <>
                  {currentUser.roll === "startup" && (
                    <>
                      <div className="element">
                        <span>NIC </span>
                        <input type="text" placeholder={user.nic} />
                      </div>
                      <h2 className="moreDetails">Other Information</h2>
                      <div className="element">
                        <span>Expected Business Category </span>
                        <input type="text" placeholder={user.category} />
                      </div>
                      <div className="element">
                        <span>Target Business Area </span>
                        <input type="text" placeholder={user.target_area} />
                      </div>
                    </>
                  )}
                  {currentUser.roll === "existing" && (
                    <>
                      <h2 className="moreDetails">Business Information</h2>
                      <div className="element">
                        <span>Business Category </span>
                        <input type="text" placeholder={user.category} />
                      </div>
                      <div className="element">
                        <span>Business Name </span>
                        <input type="text" placeholder={user.business_name} />
                      </div>
                      <div className="element">
                        <span>Registration Number </span>
                        <input type="text" placeholder={user.reg_no} />
                      </div>
                      <div className="element">
                        <span>Business Address </span>
                        <input type="text" placeholder={user.address} />
                      </div>
                      <div className="element">
                        <span>Description </span>
                        <input type="text" placeholder={user.description} />
                      </div>
                    </>
                  )}
                  {currentUser.roll === "consultant" && (
                    <>
                      <h2 className="moreDetails">Other Information</h2>
                      <div className="element">
                        <span>Education Qualifications </span>
                        <input type="text" placeholder={user.qualification} />
                      </div>
                      <div className="element">
                        <span>Institute </span>
                        <input type="text" placeholder={user.institute} />
                      </div>
                      <div className="element">
                        <span>Work Experiences </span>
                        <input type="text" placeholder={user.experiences} />
                      </div>
                      <div className="element">
                        <span>Consultation Fee </span>
                        <input type="text" placeholder={user.fee} />
                      </div>
                    </>
                  )}
                  {currentUser.roll === "distributor" && (
                    <>
                      <div className="element">
                        <span>Driving License No </span>
                        <input type="text" placeholder="Driving License No" />
                      </div>
                      <h2 className="moreDetails">Vehicle Information</h2>
                      <div className="element">
                        <span>Vehicle Type </span>
                        <input type="text" placeholder={user.vehicle_type} />
                      </div>
                      <div className="element">
                        <span>Vehicle Number </span>
                        <input type="text" placeholder={user.vehicle_no} />
                      </div>
                      <div className="element">
                        <span>Description </span>
                        <input type="text" placeholder={user.description} />
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
            <button className="updateBtn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
