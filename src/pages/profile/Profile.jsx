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

export const Profile = () => {
  const [editBtn, setEditBtn] = useState(false);
  const { state } = useProfile();
  const { posts } = usePost();

  const { avatar, name, bio, email, cover, userName, _id } = state?.profileData;

  const filterUserPost = posts.filter((post) => post.userId._id === _id);

  return (
    <div className="profile__container">
      <NavBar />
      <div className="home__main">
        {" "}
        <Navigation />
        {editBtn ? (
          <EditProfile setEditBtn={setEditBtn} />
        ) : (
          <div className="profile">
            <div className="profile__details">
              <section className="hero">
                <img className="cover" src={cover} alt="" />
                <img className="avatar" src={avatar} alt={name} />

                <div className="hero__details">
                  <div>
                    <h3>{name}</h3>
                    <p>@{userName}</p>
                    <p>{bio}</p>
                  </div>
                  <div className="profile__action__btns">
                    <button
                      onClick={() => {
                        setEditBtn(true);
                      }}
                    >
                      Edit Profile
                    </button>
                    <button>Delete Profile</button>
                  </div>
                </div>
              </section>
              <section className="hero__follow">
                <p>Posts(0)</p>
                <p>Followers(0)</p>
                <p>Following(0)</p>
              </section>
            </div>
            <div className="user__post">
              <Posts posts={filterUserPost} />
            </div>
          </div>
        )}
        <Suggestion />
      </div>
    </div>
  );
};
