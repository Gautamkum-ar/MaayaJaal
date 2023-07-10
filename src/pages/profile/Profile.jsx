import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import "../profile/style.css";
import "../Home/feed/feedStyle.css";

import { useProfile } from "../../contexts/profileContext";
import { Navigation } from "../Home/navigation/Navigaton";
import { Suggestion } from "../Home/suggestion/Suggestion";
import { NavBar } from "../../component/nvabar/NavBar";
import { EditProfile } from "../../component/editProfile/EditProfile";
import { usePost } from "../../contexts/postContext";
import { Posts } from "../../component/posts/Posts";
import { Loader } from "../../component/loader/Loader";
import { useAuth } from "../../contexts/authContext";
import { Footer } from "../../component/footer/Footer";
import { Followers } from "../../component/followes/Followes";
import { Following } from "../../component/following/Following";

export const Profile = () => {
  const [editBtn, setEditBtn] = useState(false);
  const [togglePost, setTogglePost] = useState(true);
  const [toggleFollowers, setToggleFollowers] = useState(false);
  const [toggleFollowing, setFollowing] = useState(false);

  const navigate = useNavigate();

  const { state, isProfileLoading } = useProfile();
  const { posts } = usePost();
  const { userData } = useAuth();

  const data = state.profileData ? state.profileData : userData;
  const { avatar, name, bio, cover, userName, _id, portfolio } = data;

  const followerData = state?.followerData;


  // console.log(userData);
  // getting login user followers

  const followers = followerData.filter(
    (follow) => follow.reciverId.toString() === _id.toString()
  );

  // getting users follows by login user

  const followByThisUser = followerData.filter(
    (follow) => follow.senderId.toString() === _id.toString()
  );

  //getting login user posts

  const filterUserPost = posts.filter((post) => post.userId._id === _id);

  return (
    <div className="profile__container">
      {isProfileLoading && <Loader />}
      <NavBar />
      <div className="home__main">
        {" "}
        <Navigation />
        <div className="profile">
          {editBtn && <EditProfile setEditBtn={setEditBtn} />}
          <div className="profile__nav">
            <div className="back__btn">
              <FaArrowLeft onClick={() => navigate("/home")} />
            </div>

            <section className="user_name_nav">
              <h1>{name}</h1>
              <p>{filterUserPost.length} posts</p>
            </section>
          </div>
          <div className="profile__detail">
            <section className="hero">
              <img className="cover" src={cover} alt="" />
              <img className="avatar" src={avatar} alt={name} />

              <div className="hero__detail">
                <div>
                  <h3>{name}</h3>
                  <span>@{userName}</span>
                  <p>{bio}</p>
                  <Link to={portfolio}>{portfolio}</Link>
                </div>
                <div className="profile__action__btns">
                  <button
                    onClick={() => {
                      setEditBtn(true);
                    }}
                  >
                    Edit Profile
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
                Posts({filterUserPost.length})
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
            {togglePost && <Posts posts={filterUserPost} />}
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
