import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    telephone: "",
    name: "",
    roll: "",
    nic: "",
    category: "",
    businessName: "",
    regNo: "",
    address: "",
    qualification: "",
    consultationFee: "",
    driveLicNo: "",
    vehicleType: "",
    vehicleNo: "",
  });

  const [err, setErr] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

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

  const resetInputs = () => {
    setInputs({
      username: "",
      email: "",
      password: "",
      telephone: "",
      name: "",
      roll: "",
      nic: "",
      category: "",
      businessName: "",
      regNo: "",
      address: "",
      qualification: "",
      consultationFee: "",
      driveLicNo: "",
      vehicleType: "",
      vehicleNo: "",
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      resetInputs();
      setErr("Successfully registered");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setInputs((prev) => ({ ...prev, roll: role }));
    setShowAdditionalFields(true);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Empower Lanka.</h1>
          <p>
            We are an international corporation that takes on regional
            initiatives and aids in the expansion of your business through
            reliable communities and networks.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="telephone"
              value={inputs.telephone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <select
              name="roll"
              value={inputs.roll}
              onChange={handleRoleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select Role</option>
              <option value="startup">Startup Entrepreneur</option>
              <option value="existing">Existing Entrepreneur</option>
              <option value="distributor">Distributor</option>
              <option value="consultant">Consultant</option>
            </select>

            {showAdditionalFields && inputs.roll === "existing" && (
              <>
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
                  placeholder="Address"
                  name="address"
                  value={inputs.address}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>
            )}

            {showAdditionalFields && inputs.roll === "startup" && (
              <>
                <input
                  type="text"
                  placeholder="NIC"
                  name="nic"
                  value={inputs.nic}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>
            )}
            {showAdditionalFields && inputs.roll === "distributor" && (
              <>
                <input
                  type="text"
                  placeholder="Driving Licenese No"
                  name="driveLicNo"
                  value={inputs.driveLicNo}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="VehicleT ype"
                  name="vehicleType"
                  value={inputs.vehicleType}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Vehicle No"
                  value={inputs.vehicleNo}
                  name="vehicleNo"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>

              // drive lic no, vehicle type, vehicle no
            )}
            {showAdditionalFields && inputs.roll === "consultant" && (
              <>
                <input
                  type="text"
                  placeholder="qualification"
                  name="qualification"
                  value={inputs.qualification}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Consultation Fee Per Session"
                  name="consultationFee"
                  value={inputs.consultationFee}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>
            )}

            {err && !isTyping && (
              <span
                className="error"
                style={{
                  color:
                    err === "Successfully registered"
                      ? "rgb(0, 172, 95)"
                      : "red",
                }}
              >
                {err}
              </span>
            )}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
