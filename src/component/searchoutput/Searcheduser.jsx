import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/profileContext";

import "../searchoutput/Searcheduser.css";

export const Searchdata = () => {
  const { state, dispatch } = useProfile();
  const navigate = useNavigate();

  return (
    <div className="search__user__main">
      {state.searchData.length > 0 ? (
        <>
          {state?.searchData.map((user) => {
            const { _id, avatar, name } = user;
            return (
              <div
                onClick={() => {
                  navigate("/singleuser");
                  dispatch({ type: "FIND_SINGLE_PROFILE", payload: user });
                }}
                key={_id}
                className="search__user"
              >
                <img src={avatar} alt={name} />
                <p className="user__name">{name}</p>
              </div>
            );
          })}
        </>
      ) : (
        <p className="not__found">Search user not found</p>
      )}
    </div>
  );
};
