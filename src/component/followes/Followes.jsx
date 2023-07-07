import { useProfile } from "../../contexts/profileContext";

import "../followes/Followers.css";

export const Followers = ({ followers }) => {
  const { state } = useProfile();
  const followerUsers = state?.allusers.filter((user) =>
    followers.find(
      (follow) => follow.senderId.toString() === user._id.toString()
    )
  );
  return (
    <div className="followers">
      {followerUsers.length < 1 ? (
        <h1>Opps! You don't any followers yet </h1>
      ) : (
        <>
          {followerUsers.map((user) => (
            <div className="followers__card" key={user._id}>
              <div className="avatar__sec">
                <img src={user.avatar} alt="" />
              </div>
              <div className="desc">
                <h3>{user.name}</h3>
                <p>{user.bio}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
