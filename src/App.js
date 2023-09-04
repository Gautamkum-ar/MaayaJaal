import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./pages/Home/feed/feedStyle.css";
import { Landing } from "./pages/landing/Landing";
import { Home } from "./pages/Home/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./pages/profile/Profile";
import { useAuth } from "./contexts/authContext";
import { Loader } from "./component/loader/Loader";
import { SingleProfile } from "./pages/singleUser/SinglePorfile";
import { ProtectedRoutes, PublicRoutes } from "./utils/routes";
import { BookMarks } from "./pages/bookmark/BookMark";
import { MobileNav } from "./component/mobileNav/MobileNav";
import { SinglePost } from "./pages/singlepost/SinglePost";

import ReactGA from "react-ga4";
import { useEffect } from "react";

const GOOGLE_ANALYTIC_KEY = "G-57N32WKWCK";
ReactGA.initialize(GOOGLE_ANALYTIC_KEY);
function App() {
  const { loading } = useAuth();

  // if (window.performance) {
  //   const timeSincePageLoad = Math.round(performance.now());
  //   ReactGA.timing({
  //     category: "JS Libraries",
  //     variable: "load",
  //     value: timeSincePageLoad, // in milliseconds
  //     label: "CDN libs",
  //   });
  // }
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: "Custom Title",
    });
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <MobileNav />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/singleuser" element={<SingleProfile />} />
            <Route path="/bookmark" element={<BookMarks />} />
            <Route path="/singlepost/:postId" element={<SinglePost />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Landing />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
