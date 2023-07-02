import "./style.css";

import { useProfile } from "../../contexts/profileContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";

export const NavBar = () => {
  const { state, setState } = useAuth();
  const { getProfileData } = useProfile();

  const navigate = useNavigate();
  const logOutHnadler = () => {
    setState({
      ...state,
      authenticated: false,
      loading: false,
      userData: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/home">
        {" "}
        <p className="nav__logo">
          Maaya <span>Jaal</span>
        </p>
      </Link>
      <p className="search">
        <input type="text" placeholder="Search User" />
      </p>
      <div className="user__profile">
        <img
          src={state.userData.avatar}
          alt="user"
          onClick={() => {
            getProfileData();
            navigate("/profile");
          }}
        />
        <button className="logout" onClick={() => logOutHnadler()}>
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};
