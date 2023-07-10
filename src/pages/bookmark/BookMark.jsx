import { Link } from "react-router-dom";

import "../bookmark/style.css";

import { Posts } from "../../component/posts/Posts";
import { useAuth } from "../../contexts/authContext";
import { useBookMark } from "../../contexts/bookmarkContext";
import { usePost } from "../../contexts/postContext";
import { NavBar } from "../../component/nvabar/NavBar";
import { Navigation } from "../Home/navigation/Navigaton";
import { Suggestion } from "../Home/suggestion/Suggestion";

export const BookMarks = () => {
  const { state } = usePost();
  const { userData } = useAuth();
  const { bookmarkData } = useBookMark();

  // getting bookmark post data
  
  const filterData = state?.postData.filter((post) =>
    bookmarkData.find(
      (book) =>
        book.postId._id.toString() === post._id.toString() &&
        book.userId === userData._id
    )
  );

  return (
    <div className="bookmark__container">
      <NavBar />
      <div className="bookmark__main">
        <Navigation />
        <div className="middle">
          {filterData.length > 0 ? (
            <Posts posts={filterData} />
          ) : (
            <p className="no__post__text">
              Opps! there is no bookmark post{" "}
              <Link to="/home">Continue Browsing</Link>
            </p>
          )}
        </div>
        <Suggestion />
      </div>
    </div>
  );
};
