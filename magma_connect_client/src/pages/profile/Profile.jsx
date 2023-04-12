import "./profile.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

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
            <button>follow</button>
          </div>
        </div>
      </div>
      <div className="userDetails">
        <div className="uInfo">
          <form>
            <div>
              <span>Name </span>
              <input type="text" placeholder="Name" />
            </div>
            <div>
              <span>Email </span>
              <input type="text" placeholder="Email" />
            </div>
            <div>
              <span>Address </span>
              <input type="text" placeholder="Address" />
            </div>
            <div>
              <span>Contact Number </span>
              <input type="text" placeholder="Contact Number" />
            </div>
            {currentUser.roll === "startup" && (
              <>
                <div>
                  <span>NIC </span>
                  <input type="text" placeholder="NIC" />
                </div>
                <div>
                  <span>Do you already have a business?</span>
                  <button>Swith to entreprenure</button>
                </div>
              </>
            )}
            {currentUser.roll === "existing" && (
              <>
                <div>
                  <span>Business Category </span>
                  <input type="text" placeholder="Business Category" />
                </div>
                <div>
                  <span>Business Name </span>
                  <input type="text" placeholder="Business Name" />
                </div>
                <div>
                  <span>Business Address </span>
                  <input type="text" placeholder="Business Address" />
                </div>
              </>
            )}
            {currentUser.roll === "consultant" && (
              <>
                <div>
                  <span>Qualifications </span>
                  <input type="text" placeholder="Qualifications" />
                </div>
                <div>
                  <span>Institute </span>
                  <input type="text" placeholder="Institute" />
                </div>
                <div>
                  <span>Experiences </span>
                  <input type="text" placeholder="Experiences" />
                </div>
                <div>
                  <span>Consultation Fee </span>
                  <input type="text" placeholder="Experiences" />
                </div>
              </>
            )}
            {currentUser.roll === "distributor" && (
              <>
                <div>
                  <span>Vehicle Type </span>
                  <input type="text" placeholder="Vehicle Type" />
                </div>
                <div>
                  <span>Vehicle Number </span>
                  <input type="text" placeholder="Vehicle Number" />
                </div>
                <div>
                  <span>Description </span>
                  <input type="text" placeholder="Description" />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
