import { Link } from "react-router-dom";
import "../mobileNav/style.css";
import {
  FaBookmark,
  FaHeart,
  FaHome,
  FaPlus,
  FaWpexplorer,
} from "react-icons/fa";

export const MobileNav = () => {
  return (
    <div className="mobile__nav">
      {" "}
      <Link className="navigations" to="/home">
        {" "}
        <FaHome />
      </Link>
      <Link className="navigations" to="/home">
        {" "}
        <FaWpexplorer />
      </Link>
      <button className="mobile__create_post">
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
