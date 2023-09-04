import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import "../singlepost/style.css";

import { Posts } from "../../component/posts/Posts";
import { usePost } from "../../contexts/postContext";
import { Comments } from "../../component/comments/Comment";
import { NavBar } from "../../component/nvabar/NavBar";
import { Navigation } from "../Home/navigation/Navigaton";
import { Suggestion } from "../Home/suggestion/Suggestion";
import { Footer } from "../../component/footer/Footer";


export const SinglePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { state } = usePost();

  //getting single post

  const filterPost = state?.postData?.filter(
    (post) => post._id.toString() === postId.toString()
  );

  return (
    <div className="single__post">
      <NavBar />
      <div className="single__post__main">
        <Navigation />
        <div className="single__post__container">
          <div className="profile__nav">
            <div className="back__btn">
              <FaArrowLeft onClick={() => navigate("/home")} />
            </div>
            <section className="user_name_nav">
              <h1>Post</h1>
            </section>
          </div>
          <Posts posts={filterPost} />
          <Comments post={filterPost[0]} />
        </div>
        <Suggestion />
      </div>
      <Footer />
    </div>
  );
};
