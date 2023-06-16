import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SingUp } from "./pages/signup/SignUp";
import { Login } from "./pages/login/Login";
import { Landing } from "./pages/landing/Landing";
import { Home } from "./pages/Home/Home";
import { NavBar } from "./pages/component/nvabar/NavBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./pages/profile/Profile";
// import { RequireAuth } from "./RequireAuth/requireAuth";

function App() {
  return (
    <div className="App">
      <ToastContainer />
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
