import { useState } from "react";
import { useProfile } from "../../contexts/profileContext";
import { Searchdata } from "./Searcheduser";

export const SearchInput = () => {
  const [userInput, setUserInput] = useState("");
  const { state, dispatch } = useProfile();

  return (
    <div className="search__input">
      <input
        type="text"
        placeholder="Search User"
        onChange={(e) => {
          e.preventDefault();
          setUserInput(e.target.value);
          dispatch({ type: "SEARCH__INPUT", payload: e.target.value });
        }}
      />
      {userInput !== "" && userInput.trim() !== "" && <Searchdata />}
    </div>
  );
};
