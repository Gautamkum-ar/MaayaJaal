import { toast } from "react-toastify";
import { useProfile } from "../../contexts/profileContext";
import "./style.css";
import { useState } from "react";

export const EditProfile = ({ setEditBtn }) => {
  const { state, handleAvatar, editProfileHandler } = useProfile();
  const [editProfile, setEditProfile] = useState({
    ...state.profileData,
  });
  return (
    <div className="edit__profile__container">
      <div className="edit__profile__main">
        <h1>Update Your Profile</h1>
        <button className="close__edit__btn" onClick={() => setEditBtn(false)}>
          X
        </button>
        <div className="change__user__avatar">
          <img src={editProfile.avatar} alt="" />
          <input
            className="select"
            placeholder="pic"
            type="file"
            accept="image"
            onChange={
              (e) => {
                e.target.files[0].size > 5e6
                  ? toast.warning("Image size must be less then 5mb")
                  : handleAvatar(e);
              }
              // setEditProfile({ ...editProfile, image: e.target.value })
            }
          />
        </div>
        <div className="change__name">
          <p>Change your name</p>
          <input
            type="text"
            className="name"
            value={editProfile.name}
            onChange={(e) =>
              setEditProfile({ ...editProfile, name: e.target.value })
            }
          />
        </div>
        <div className="change__name">
          <p>Change your username</p>
          <input
            type="text"
            className="username"
            value={editProfile.userName}
            onChange={(e) =>
              setEditProfile({ ...editProfile, userName: e.target.value })
            }
          />
        </div>
        <div className="change__bio">
          <p>Change your bio</p>
          <input
            type="text"
            className="bio"
            value={editProfile.bio}
            onChange={(e) =>
              setEditProfile({ ...editProfile, bio: e.target.value })
            }
          />
        </div>

        <button
          className="upload__btn"
          onClick={() => {
            editProfileHandler(editProfile);
            setEditBtn(false);
          }}
        >
          Update profile
        </button>
      </div>
    </div>
  );
};
