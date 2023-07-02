import { FaFire } from "react-icons/fa";
import { usePost } from "../../../contexts/postContext";

export const FilterBox = () => {
  const { dispatch } = usePost();
  return (
    <div className="filter__buttons">
      <button onClick={() => dispatch({ type: "SORT_BY_LIKES" })}>
        {" "}
        <FaFire /> Trending
      </button>
      <button onClick={() => dispatch({ type: "SORT_BY_DATE" })}>Latest</button>
    </div>
  );
};
