import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { AuthAdminContext } from "../../context/authAdminContext";
import ProfilePic from "../../assets/user.png";

export const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const login_register = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Empower Lanka</span>
        </Link>
        {/* <HomeOutlinedIcon /> */}
        {/* <GridViewOutlinedIcon /> */}
      </div>

      <div className="middle">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Home</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Buy</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Dashboard</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Contact Us</span>
        </Link>
      </div>

      <div className="right">
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <button className="logout_btn" onClick={logout}>
          Logout
        </button>
        <div className="user">
          <img src={ProfilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export const NavbarDefault = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  // const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // const logout = () => {

  //   localStorage.removeItem('user');
  //   navigate("/login");
  // };

  const login_register = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Empower Lanka</span>
        </Link>

        {/* <button onClick={logout}>Logout</button> */}
      </div>

      <div className="middle">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Home</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Buy</span>
        </Link>
        {/* <Link to="/" style={{ textDecoration: "none" }}>
          <span>Dashboard</span>
        </Link> */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Contact Us</span>
        </Link>
      </div>

      <div className="right">
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <button className="logout_btn" onClick={login_register}>
          Login/Register
        </button>
      </div>
    </div>
  );
};

export const NavbarAdmin = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentAdmin } = useContext(AuthAdminContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Empower Lanka</span>
        </Link>

        {/* <button onClick={logout}>Logout</button> */}
      </div>

      <div className="middle"></div>

      <div className="right">
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <button className="logout_btn" onClick={logout}>
          Logout
        </button>
        <div className="user">
          <img src={ProfilePic} alt="" />
          <span>{currentAdmin.name}</span>
        </div>
      </div>
    </div>
  );
};
