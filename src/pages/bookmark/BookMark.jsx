import { FaBookmark, FaThumbsUp } from "react-icons/fa";
import { Posts } from "../../component/posts/Posts";
import { useAuth } from "../../contexts/authContext";
import { useBookMark } from "../../contexts/bookmarkContext";
import { usePost } from "../../contexts/postContext";
import { Comments } from "../../component/comments/Comment";
import { NavBar } from "../../component/nvabar/NavBar";

import "../bookmark/style.css";
import { Navigation } from "../Home/navigation/Navigaton";
import { Suggestion } from "../Home/suggestion/Suggestion";

export const BookMarks = () => {
  const { state } = usePost();
  const { userData } = useAuth();
  const { bookmarkData } = useBookMark();

  const filterData = state?.postData.filter((post) =>
    bookmarkData.find(
      (book) =>
        book.postId._id.toString() === post._id.toString() &&
        book.userId === userData._id
    )
  );

  //   const bookmarkPost =filterData.filter((post)=>)
  console.log(filterData);
  return (
    <div className="bookmark__container">
      <NavBar />
      <div className="bookmark__main">
        <Navigation />
        <div className="middle">
          <Posts posts={filterData} />
        </div>
        <Suggestion />
      </div>
    </div>
  );
};
