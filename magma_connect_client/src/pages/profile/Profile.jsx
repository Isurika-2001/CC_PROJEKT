import "./profile.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

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
              <button>Swith to entreprenure</button>
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
            {currentUser.roll === "startup" && (
              <>
                <div className="element">
                  <span>NIC </span>
                  <input type="text" placeholder="NIC" />
                </div>
                <h2 className="moreDetails">Other Information</h2>
                <div className="element">
                  <span>Expected Business Category </span>
                  <input type="text" placeholder="Business Category" />
                </div>
                <div className="element">
                  <span>Target Business Area </span>
                  <input type="text" placeholder="Target Area" />
                </div>
              </>
            )}
            {currentUser.roll === "existing" && (
              <>
                <h2 className="moreDetails">Business Information</h2>
                <div className="element">
                  <span>Business Category </span>
                  <input type="text" placeholder="Business Category" />
                </div>
                <div className="element">
                  <span>Business Name </span>
                  <input type="text" placeholder="Business Name" />
                </div>
                <div className="element">
                  <span>Business Name </span>
                  <input type="text" placeholder="Business Name" />
                </div>
                <div className="element">
                  <span>Registration Number </span>
                  <input type="text" placeholder="Registration Number" />
                </div>
                <div className="element">
                  <span>Business Address </span>
                  <input type="text" placeholder="Business Address" />
                </div>
              </>
            )}
            {currentUser.roll === "consultant" && (
              <>
                <h2 className="moreDetails">Other Information</h2>
                <div className="element">
                  <span>Education Qualifications </span>
                  <input type="text" placeholder="Education Qualifications" />
                </div>
                <div className="element">
                  <span>Institute </span>
                  <input type="text" placeholder="Institute" />
                </div>
                <div className="element">
                  <span>Work Experiences </span>
                  <input type="text" placeholder="Work Experiences" />
                </div>
                <div className="element">
                  <span>Consultation Fee </span>
                  <input type="text" placeholder="Consultation Fee" />
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
                  <input type="text" placeholder="Vehicle Type" />
                </div>
                <div className="element">
                  <span>Vehicle Number </span>
                  <input type="text" placeholder="Vehicle Number" />
                </div>
                <div className="element">
                  <span>Description </span>
                  <input type="text" placeholder="Description" />
                </div>
              </>
            )}
            <button className="updateBtn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
