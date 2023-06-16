import { FaFire } from "react-icons/fa";
import "../suggestion/suggStyle.css";

export const Suggestion = () => {
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
        <div className="suggest__user">
          <img src="" alt="SU" />
          <p className="user__name">Gautam Kumar</p>
          <button>+Follow</button>
        </div>
        <div className="suggest__user">
          <img src="" alt="SU" />
          <p className="user__name">Gautam Kumar</p>
          <button>+Follow</button>
        </div>
        <div className="suggest__user">
          <img src="" alt="SU" />
          <p className="user__name">Gautam Kumar</p>
          <button>+Follow</button>
        </div>
        <div className="suggest__user">
          <img src="" alt="SU" />
          <p className="user__name">Gautam Kumar</p>
          <button>+Follow</button>
        </div>
      </div>
    </div>
  );
};
