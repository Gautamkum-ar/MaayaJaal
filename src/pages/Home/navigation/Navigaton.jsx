import { FaBookmark, FaHeart, FaHome, FaWpexplorer } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../navigation/navStyle.css";

import { useBookMark } from "../../../contexts/bookmarkContext";

export const Navigation = () => {
  const { getBookMark } = useBookMark();
  return (
    <div className="naviation__container">
      <div className="navigation__main">
        <Link className="navigations" to="/home">
          {" "}
          <FaHome />
          Home
        </Link>
        <Link className="navigations" to="/home">
          {" "}
          <FaWpexplorer />
          Explore
        </Link>
        <Link className="navigations" to="/bookmark">
          <FaBookmark onClick={() => getBookMark()} /> BookMarks
        </Link>
      </div>
    </div>
  );
};
