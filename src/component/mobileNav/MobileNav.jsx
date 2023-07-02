import { Link } from "react-router-dom";
import "../mobileNav/style.css";
import {
  FaBookmark,
  FaHeart,
  FaHome,
  FaPlus,
  FaWpexplorer,
} from "react-icons/fa";
import { CreatePost } from "../posts/createPost/CreatePost";
import { useState } from "react";

export const MobileNav = () => {
  const [toggleCreateButton, setToggleCeateButton] = useState(false);
  return (
    <div className="mobile__nav">
      {/* {toggleCreateButton && (
        <div className="newpost">
          {" "}
          <CreatePost />
        </div>
      )} */}

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
        <FaPlus />
      </button>
      <Link className="navigations" to="/bookmark">
        <FaBookmark />
      </Link>
      <Link className="navigations">
        {" "}
        <FaHeart />
      </Link>
    </div>
  );
};
