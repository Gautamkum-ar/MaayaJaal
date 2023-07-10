import "./style.css";

import { useProfile } from "../../contexts/profileContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import { SearchInput } from "../searchoutput/SearchInput";

export const NavBar = () => {
  const { userData, logOutHnadler } = useAuth();
  const { getProfileData, state } = useProfile();

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/home">
        {" "}
        <p className="nav__logo">
          Maaya <span>Jaal</span>
        </p>
      </Link>

      <div className="search">
        <SearchInput />
      </div>
      <div className="user__profile">
        <img
          src={userData?.avatar}
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
