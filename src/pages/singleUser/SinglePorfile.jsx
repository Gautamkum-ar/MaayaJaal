import { FaArrowLeft } from "react-icons/fa";
import { NavBar } from "../../component/nvabar/NavBar";
import { Posts } from "../../component/posts/Posts";
import { useAuth } from "../../contexts/authContext";
import { usePost } from "../../contexts/postContext";
import { useProfile } from "../../contexts/profileContext";
import { Navigation } from "../Home/navigation/Navigaton";
import { Suggestion } from "../Home/suggestion/Suggestion";
import "../singleUser/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../component/footer/Footer";

export const SingleProfile = () => {
  const navigate = useNavigate();
  const { state, followingHandler } = useProfile();
  const { posts } = usePost();
  const { userData } = useAuth();

  const { _id, avatar, cover, name, userName, bio, portfolio } =
    state?.singleUserData;

  const followerData = state?.followerData;

  const following = followerData.filter(
    (follow) =>
      follow.senderId.toString() === userData._id.toString() &&
      follow.reciverId.toString() === _id.toString()
  );

  const followers = followerData.filter(
    (follow) => follow.reciverId.toString() === _id.toString()
  );
  const followByThisUser = followerData.filter(
    (follow) => follow.senderId.toString() === _id.toString()
  );

  console.log(followerData);
  const singleUserPost = posts.filter(
    (post) => post.userId._id.toString() === _id
  );
  return (
    <div className="single__profile">
      <NavBar />
      <div className="single__profile__main">
        <Navigation />

        <div className="profile">
          <div className="profile__nav">
            <div className="back__btn">
              <FaArrowLeft onClick={() => navigate("/home")} />
            </div>
            <section className="user_name_nav">
              <h1>{name}</h1>
              <p>{singleUserPost.length} posts</p>
            </section>
          </div>
          <div className="profile__details">
            <section className="hero">
              <img className="cover" src={cover} alt="" />
              <img className="avatar" src={avatar} alt={name} />

              <div className="hero__details">
                <div>
                  <h3>{name}</h3>
                  <p>@{userName}</p>
                  <p>{bio}</p>
                  <Link to={portfolio}>{portfolio}</Link>
                </div>
                <div className="follow__action">
                  <button onClick={() => followingHandler(_id)}>
                    {following.length > 0 ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            </section>
            <section className="hero__follow">
              <p>Posts({singleUserPost.length})</p>
              <p>Followers({followers.length})</p>
              <p>Following({followByThisUser.length})</p>
            </section>
          </div>
          <div className="user__post">
            <Posts posts={singleUserPost} />
          </div>
        </div>

        <Suggestion />
      </div>
      <Footer />
    </div>
  );
};
