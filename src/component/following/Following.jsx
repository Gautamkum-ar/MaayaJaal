import { useProfile } from "../../contexts/profileContext";

import "../following/Following.css";

export const Following = ({ following }) => {
  const { state } = useProfile();

  const followingUsers = state?.allusers.filter((user) =>
    following.find(
      (follow) => follow.reciverId.toString() === user._id.toString()
    )
  );
  return (
    <div className="following">
      {followingUsers.length < 1 ? (
        <h1>Opps! you have not following anyone </h1>
      ) : (
        <>
          {followingUsers.map((user) => (
            <div className="following__card" key={user._id}>
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
