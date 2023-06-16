import { toast } from "react-toastify";
import { useProfile } from "../../../contexts/profileContext";
import "../editProfile/style.css";

export const EditProfile = ({ setEditBtn }) => {
  const {
    setEditProfile,
    editProfile,
    state,
    handleAvatar,
    editProfileHandler,
  } = useProfile();

  return (
    <div className="edit__profile__container">
      <div className="edit__profile__main">
        <h1>Update Your Profile</h1>
        <button className="close__edit__btn" onClick={() => setEditBtn(false)}>
          X
        </button>
        <div className="change__user__avatar">
          <img
            src={
              editProfile.image ? editProfile.image : state.profileData.avatar
            }
            alt=""
          />
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
            editProfileHandler();
            setEditBtn(false);
          }}
        >
          Update profile
        </button>
      </div>
    </div>
  );
};
