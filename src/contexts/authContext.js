import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import baseUrl from "../utils/baseUrl";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [saveLoginData, setSaveLoginData] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    createPass: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const cred = {
        email: loginData.email,
        password: loginData.password,
      };

      if (loginData.email !== "" || loginData.password !== "") {
        const response = await axios.post(`${baseUrl}/login`, cred);

        setSaveLoginData(response.data.data);

        localStorage.setItem("avatar", response.data.data.user.avatar);
        localStorage.setItem("token", response.data.data.encodedToken);

        toast.success(response.data.message);

        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const guestLoginHandler = async () => {
    try {
      const cred = {
        email: "gautam@gmail.com",
        password: "gautam",
      };

      const response = await axios.post(`${baseUrl}/login`, cred);

      setSaveLoginData(response.data.data);
      localStorage.setItem("avatar", response.data.data.user.avatar);
      localStorage.setItem("token", response.data.data.encodedToken);
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const signupHandler = async () => {
    try {
      if (
        signupData.email !== "" ||
        signupData.name !== "" ||
        signupData.password !== ""
      ) {
        const response = await axios.post(`${baseUrl}/signup`, {
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        });
        console.log(response.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("Email already eixts");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setLoginData,
        loginData,
        loginHandler,
        signupHandler,
        setSignupData,
        signupData,
        guestLoginHandler,
        saveLoginData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
