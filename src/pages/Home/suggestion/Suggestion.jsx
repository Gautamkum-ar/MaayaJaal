import "../suggestion/suggStyle.css";
import { useProfile } from "../../../contexts/profileContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { FilterBox } from "../../../component/filter/Filter";

export const Suggestion = () => {
  const { state, dispatch } = useProfile();
  const { userData } = useAuth();

  const filterSuggestUser = state?.allusers.filter(
    (user) => user._id !== userData._id
  );

  const navigate = useNavigate();
  return (
    <div className="suggestion__container">
      <div className="filters">
        <FilterBox />
      </div>
      <div className="suggestions">
        <h2>Suggestion for you</h2>
        {filterSuggestUser.map((user) => {
          const { _id, avatar, name } = user;
          return (
            <div key={_id} className="suggest__user">
              <p className="user__name">{name}</p>
              <img
                src={avatar}
                alt={name}
                onClick={() => {
                  navigate("/singleuser");
                  dispatch({ type: "FIND_SINGLE_PROFILE", payload: user });
                }}
              />
              {/* <button onClick={() => followingHandler(_id)}>+Follow</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
