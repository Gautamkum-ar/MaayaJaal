import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./pages/Home/feed/feedStyle.css";
import { SingUp } from "./pages/signup/SignUp";
import { Login } from "./pages/login/Login";
import { Landing } from "./pages/landing/Landing";
import { Home } from "./pages/Home/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./pages/profile/Profile";
import { useAuth } from "./contexts/authContext";
import { Loader } from "./component/loader/Loader";
import { usePost } from "./contexts/postContext";
// import { RequireAuth } from "./RequireAuth/requireAuth";

function App() {
  const { isLoading } = useAuth();
  const { isPostLoading } = usePost();
  return (
    <div className="App">
      <ToastContainer />
      {isLoading || (isPostLoading && <Loader />)}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
      </Routes>
    </div>
  );
}

export default App;
