import { FaFire } from "react-icons/fa";
import "../suggestion/suggStyle.css";
import { useProfile } from "../../../contexts/profileContext";

export const Suggestion = () => {
  const { state } = useProfile();
  return (
    <div className="suggestion__container">
      <div className="filter__buttons">
        <button>
          {" "}
          <FaFire /> Trending
        </button>
        <button>Latest</button>
      </div>

      <div className="suggestions">
        <h2>Suggestion for you</h2>
        {state?.allusers.map((user) => {
          const { _id, avatar, name } = user;
          return (
            <div key={_id} className="suggest__user">
              <img src={avatar} alt={name} />
              <p className="user__name">{name}</p>
              <button>+Follow</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
