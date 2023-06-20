import { FaBookmark, FaHeart, FaHome, FaWpexplorer } from "react-icons/fa";
import "../navigation/navStyle.css";
import { Link } from "react-router-dom";

export const Navigation = () => {
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
        <Link className="navigations">
          <FaBookmark /> BookMarks
        </Link>
        <Link className="navigations">
          {" "}
          <FaHeart />
          Liked Posts
        </Link>

        {/* <button className="create__post">Create Post</button> */}
      </div>
    </div>
  );
};
