import Login from "./pages/login/Login";

import AdminLogin from "./pages/adminLogin/AdminLogin"; //------------
import Register from "./pages/register/Register";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Navbar, NavbarDefault, NavbarAdmin } from "./components/navbar/Navbar";
import {
  LeftBarConsultant,
  LeftBarEntre,
  LeftBarSEntre,
  LeftBarDistributor,
  LeftBarAdmin,
} from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import {
  ConsultantReq,
  DistributorReq,
  EntrepreneurReq,
  Home,
  SearchConsultant,
  SearchEntrepreneur,
  StartupReq,
  UserReq,
  Startuppayment,
  Consultations,
} from "./pages/home/Home";
import Welcome from "./pages/welcome/welcome";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import { AuthAdminContext } from "./context/authAdminContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { currentAdmin } = useContext(AuthAdminContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <>
        {currentUser ? (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
              {currentUser.roll === "consultant" ? (
                <LeftBarConsultant />
              ) : currentUser.roll === "distributor" ? (
                <LeftBarDistributor />
              ) : currentUser.roll === "startup" ? (
                <LeftBarSEntre />
              ) : (
                <LeftBarEntre />
              )}
              <div style={{ flex: 6 }}>
                <Outlet />
              </div>
              <RightBar />
            </div>
          </div>
        ) : (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <NavbarDefault />
            <div style={{ flex: 6, margin: "0 auto" }}>
              <Outlet />
            </div>
          </div>
        )}
      </>
    );
  };

  const LayoutAdmin = () => {
    return (
      <>
        {currentAdmin ? (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <NavbarAdmin />
            <div style={{ display: "flex" }}>
              <LeftBarAdmin />
              <div style={{ flex: 6 }}>
                <Outlet />
              </div>
            </div>
          </div>
        ) : (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Outlet />
          </div>
        )}
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: currentUser ? <Home /> : <Welcome />,
        },
        {
          path: "/profile/:id",
          element: currentUser ? <Profile /> : <Welcome />,
        },
        {
          path: "/searchentrepreneur",
          element: currentUser ? <SearchEntrepreneur /> : <Welcome />,
        },
        {
          path: "/searchconsultant",
          element: currentUser ? <SearchConsultant /> : <Welcome />,
        },
        {
          path: "/startuppayment",
          element: currentUser ? <Startuppayment /> : <Welcome />,
        },
        {
          path: "/consultations",
          element: currentUser ? <Consultations /> : <Welcome />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "/admin",
          element: currentAdmin ? <UserReq /> : <AdminLogin />,
        },
        {
          path: "/admin/startup",
          element: currentAdmin ? <StartupReq /> : <AdminLogin />,
        },
        {
          path: "/admin/entreprenure",
          element: currentAdmin ? <EntrepreneurReq /> : <AdminLogin />,
        },
        {
          path: "/admin/consultant",
          element: currentAdmin ? <ConsultantReq /> : <AdminLogin />,
        },
        {
          path: "/admin/distributor",
          element: currentAdmin ? <DistributorReq /> : <AdminLogin />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
