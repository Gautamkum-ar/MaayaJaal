import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { NavBar } from "../../component/nvabar/NavBar";
import { Posts } from "../../component/posts/Posts";
import { useAuth } from "../../contexts/authContext";
import { usePost } from "../../contexts/postContext";
import { useProfile } from "../../contexts/profileContext";
import { Navigation } from "../Home/navigation/Navigaton";
import { Suggestion } from "../Home/suggestion/Suggestion";
import "../singleUser/style.css";
import { Footer } from "../../component/footer/Footer";
import { Followers } from "../../component/followes/Followes";
import { Following } from "../../component/following/Following";

export const SingleProfile = () => {
  const [togglePost, setTogglePost] = useState(true);
  const [toggleFollowers, setToggleFollowers] = useState(false);
  const [toggleFollowing, setFollowing] = useState(false);

  const navigate = useNavigate();

  const { state, followingHandler } = useProfile();
  const { posts } = usePost();
  const { userData } = useAuth();

  const { _id, avatar, cover, name, userName, bio, portfolio } =
    state?.singleUserData;

  const followerData = state?.followerData;

  //checking if login user  following  users

  const following = followerData.filter(
    (follow) =>
      follow.senderId.toString() === userData._id.toString() &&
      follow.reciverId.toString() === _id.toString()
  );

  //getting followers data

  const followers = followerData.filter(
    (follow) => follow.reciverId.toString() === _id.toString()
  );

  //getting users followby single user

  const followByThisUser = followerData.filter(
    (follow) => follow.senderId.toString() === _id.toString()
  );

  // get single user post

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
              <p
                style={{ background: togglePost ? "rgba(0,0,0,0.1)" : "" }}
                onClick={() => {
                  setToggleFollowers(false);
                  setFollowing(false);
                  setTogglePost(true);
                }}
              >
                Posts({singleUserPost.length})
              </p>
              <p
                style={{
                  background: toggleFollowers ? "rgba(0,0,0,0.1)" : "",
                }}
                onClick={() => {
                  setToggleFollowers(true);
                  setFollowing(false);
                  setTogglePost(false);
                }}
              >
                Followers({followers.length})
              </p>
              <p
                style={{ background: toggleFollowing ? "rgba(0,0,0,0.1)" : "" }}
                onClick={() => {
                  setToggleFollowers(false);
                  setFollowing(true);
                  setTogglePost(false);
                }}
              >
                Following({followByThisUser.length})
              </p>
            </section>
          </div>
          <div className="user__post">
            {togglePost && <Posts posts={singleUserPost} />}
            {toggleFollowers && <Followers followers={followers} />}
            {toggleFollowing && <Following following={followByThisUser} />}
          </div>
        </div>

        <Suggestion />
      </div>
      <Footer />
    </div>
  );
};
