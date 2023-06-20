import { NavBar } from "../../component/nvabar/NavBar";
import "../Home/style.css";
import { Feeds } from "./feed/FeedSec";
import { Navigation } from "./navigation/Navigaton";
import { Suggestion } from "./suggestion/Suggestion";

export const Home = () => {
  return (
    <>
      <div className="home__container">
        <NavBar />
        <div className="home__main">
          <Navigation />
          <Feeds />
          <Suggestion />
        </div>
      </div>
    </>
  );
};
