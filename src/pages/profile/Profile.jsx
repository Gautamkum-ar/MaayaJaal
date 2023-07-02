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

export const Profile = () => {
  const [editBtn, setEditBtn] = useState(false);
  const { state, isProfileLoading } = useProfile();
  const { posts } = usePost();
  const { userData } = useAuth();

  const { avatar, name, bio, cover, userName, _id } = userData;

  const followerData = state?.followerData;

  const followers = followerData.filter(
    (follow) => follow.reciverId.toString() === _id.toString()
  );
  const followByThisUser = followerData.filter(
    (follow) => follow.senderId.toString() === _id.toString()
  );

  const filterUserPost = posts.filter((post) => post.userId._id === _id);
  console.log(filterUserPost);

  return (
    <div className="profile__container">
      {isProfileLoading ? (
        <Loader />
      ) : (
        <>
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
                    <p>Posts({filterUserPost.length})</p>
                    <p>Followers({followers.length})</p>
                    <p>Following({followByThisUser.length})</p>
                  </section>
                </div>
                <div className="user__post">
                  <Posts posts={filterUserPost} />
                </div>
              </div>
            )}
            <Suggestion />
          </div>
        </>
      )}
    </div>
  );
};
