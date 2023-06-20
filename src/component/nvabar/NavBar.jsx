import "./style.css";

import { useProfile } from "../../contexts/profileContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export const NavBar = () => {
  const { getProfileData } = useProfile();

  const navigate = useNavigate();
  const logOutHnadler = () => {
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
          src={localStorage.getItem("avatar")}
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
