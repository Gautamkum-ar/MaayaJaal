import { Footer } from "../../component/footer/Footer";
import { Loader } from "../../component/loader/Loader";
import { MobileNav } from "../../component/mobileNav/MobileNav";
import { NavBar } from "../../component/nvabar/NavBar";
import { useAuth } from "../../contexts/authContext";
import "../Home/style.css";
import { Feeds } from "./feed/FeedSec";
import { Navigation } from "./navigation/Navigaton";
import { Suggestion } from "./suggestion/Suggestion";

export const Home = () => {
  const { isLoading } = useAuth();

  return (
    <>
      <div className="home__container">
        <NavBar />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="home__main">
            <Navigation />
            <Feeds />
            <Suggestion />
          </div>
        )}

        <MobileNav />
        <Footer />
      </div>
    </>
  );
};
