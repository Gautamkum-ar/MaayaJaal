import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import baseUrl from "../utils/baseUrl";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [saveLoginData, setSaveLoginData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    createPass: "",
    password: "",
    userName: "",
  });

  const navigate = useNavigate();

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const cred = {
        email: loginData.email,
        password: loginData.password,
      };

      if (loginData.email !== "" || loginData.password !== "") {
        const response = await axios.post(`${baseUrl}/login`, cred);
        setIsLoading(false);
        setSaveLoginData(response.data.data);

        localStorage.setItem("avatar", response.data.data.user.avatar);
        localStorage.setItem("token", response.data.data.encodedToken);

        toast.success(response.data.message);

        navigate("/home");
      }
    } catch (error) {
      setIsLoading(false);
      error.status === 404
        ? toast.error(error.response.data.message)
        : toast.warning(error.response.data.message);
    }
  };
  const guestLoginHandler = async () => {
    setIsLoading(true);
    try {
      const cred = {
        email: "gautam@gmail.com",
        password: "gautam",
      };

      const response = await axios.post(`${baseUrl}/login`, cred);
      setIsLoading(false);
      setSaveLoginData(response.data.data);
      localStorage.setItem("avatar", response.data.data.user.avatar);
      localStorage.setItem("token", response.data.data.encodedToken);
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const signupHandler = async () => {
    setIsLoading(true);
    try {
      if (
        signupData.email !== "" ||
        signupData.name !== "" ||
        signupData.password !== "" ||
        signupData.userName !== ""
      ) {
        const response = await axios.post(`${baseUrl}/signup`, {
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
          userName: signupData.userName,
        });
        setIsLoading(false);
        console.log(response);
        toast.success(response.data.message);
        setToggleLogin(false);
      }
    } catch (error) {
      setIsLoading(false);
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
        isLoading,
        toggleLogin,
        setToggleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
