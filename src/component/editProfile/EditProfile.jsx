import { toast } from "react-toastify";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

import { useProfile } from "../../contexts/profileContext";
import { Avatar } from "../avatar/Avatar";

import "./style.css";

export const EditProfile = ({ setEditBtn }) => {
  const [toggleAvatarChange, setToggleAvatarChange] = useState(false);
  const { state, editProfileHandler } = useProfile();
  const [editProfile, setEditProfile] = useState({
    ...state.profileData,
  });

  const handleAvatar1 = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setEditProfile({ ...editProfile, avatar: reader.result });
    };
  };

  console.log(editProfile);
  return (
    <div className="edit__profile__container">
      <div className="edit__profile__main">
        <h1>Update Your Profile</h1>
        <button className="close__edit__btn" onClick={() => setEditBtn(false)}>
          X
        </button>
        <div className="change__user__avatar">
          <div className="image__sec">
            <img
              src={
                editProfile.avatars ? editProfile.avatars : editProfile.avatar
              }
              alt="Camera"
            />

            <label>
              <span>
                {" "}
                <BiImageAdd />
              </span>
              <input
                className="select"
                placeholder="Upload Image"
                type="file"
                accept="image"
                onChange={
                  (e) => {
                    e.target.files[0].size > 5e6
                      ? toast.warning("Image size must be less then 5mb")
                      : handleAvatar1(e);
                  }
                  // setEditProfile({ ...editProfile, image: e.target.value })
                }
              />
            </label>
          </div>
          <p>or</p>
          <div className="avatar__sec">
            <img
              src={
                editProfile.avatars ? editProfile.avatars : editProfile.avatar
              }
              alt="avatar"
            />

            <div onClick={() => setToggleAvatarChange(!toggleAvatarChange)}>
              <span>
                <RxAvatar />
              </span>
            </div>
          </div>
        </div>
        {toggleAvatarChange && (
          <Avatar
            setEditProfile={setEditProfile}
            editProfile={editProfile}
            setToggleAvatarChange={setToggleAvatarChange}
          />
        )}
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
        <div className="change__bio">
          <p>change Portfolio</p>
          <input
            type="text"
            className="bio"
            value={editProfile.portfolio}
            onChange={(e) =>
              setEditProfile({ ...editProfile, portfolio: e.target.value })
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
