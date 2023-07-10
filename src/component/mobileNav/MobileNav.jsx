import { Link, useNavigate } from "react-router-dom";
import "../mobileNav/style.css";
import { FaBookmark, FaHome, FaSearch, FaWpexplorer } from "react-icons/fa";
import { useState } from "react";
import { SearchInput } from "../searchoutput/SearchInput";
import { useProfile } from "../../contexts/profileContext";
import { useAuth } from "../../contexts/authContext";

export const MobileNav = () => {
  const [toggleCreateButton, setToggleCeateButton] = useState(false);
  const { getProfileData,state } = useProfile();
  const { userData } = useAuth();

  const navigate = useNavigate();

  const data=state.profileData?state.profileData:userData
  return (
    <div className="mobile__nav">
      {toggleCreateButton && (
        <div className="search__Mobile">
          {" "}
          <SearchInput />
        </div>
      )}

      <Link className="navigations" to="/home">
        {" "}
        <FaHome />
      </Link>
      <Link className="navigations" to="/home">
        {" "}
        <FaWpexplorer />
      </Link>
      <button
        className="mobile__create_post"
        onClick={() => setToggleCeateButton(!toggleCreateButton)}
      >
        <FaSearch />
      </button>
      <Link className="navigations" to="/bookmark">
        <FaBookmark />
      </Link>
      <div className="user__profile__mobile">
        <img
          src={data?.avatar}
          alt="user"
          onClick={() => {
            getProfileData();
            navigate("/profile");
          }}
        />
      </div>
    </div>
  );
};
