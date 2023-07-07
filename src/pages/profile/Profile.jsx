import { useState } from "react";
import { useProfile } from "../../contexts/profileContext";
import { Navigation } from "../Home/navigation/Navigaton";
import { Suggestion } from "../Home/suggestion/Suggestion";
import { NavBar } from "../../component/nvabar/NavBar";
import "../profile/style.css";
import "../Home/feed/feedStyle.css";
import { EditProfile } from "../../component/editProfile/EditProfile";
import { usePost } from "../../contexts/postContext";
import { Posts } from "../../component/posts/Posts";
import { Loader } from "../../component/loader/Loader";
import { useAuth } from "../../contexts/authContext";
import { FaArrowLeft } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Footer } from "../../component/footer/Footer";

export const Profile = () => {
  const [editBtn, setEditBtn] = useState(false);

  const navigate = useNavigate();

  const { state, isProfileLoading } = useProfile();
  const { posts } = usePost();
  const { userData } = useAuth();

  const { avatar, name, bio, cover, userName, _id, portfolio } = userData;

  const followerData = state?.followerData;

  const followers = followerData.filter(
    (follow) => follow.reciverId.toString() === _id.toString()
  );
  const followByThisUser = followerData.filter(
    (follow) => follow.senderId.toString() === _id.toString()
  );

  const filterUserPost = posts.filter((post) => post.userId._id === _id);
  console.log(userData);

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
              <p>Posts({filterUserPost.length})</p>
              <p>Followers({followers.length})</p>
              <p>Following({followByThisUser.length})</p>
            </section>
          </div>
          <div className="user__post">
            <Posts posts={filterUserPost} />
          </div>
        </div>
        <Suggestion />
      </div>
      <Footer />
    </div>
  );
};
