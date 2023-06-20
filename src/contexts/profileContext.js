import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { proReducer } from "../reducers/profilereducer/proReducer";
import { useNavigate } from "react-router-dom";

import baseUrl from "../utils/baseUrl";
import { toast } from "react-toastify";

const ProfileContext = createContext();

const initialState = {
  profileData: {},
  allusers: [],
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(proReducer, initialState);

  const [imag, setImage] = useState();

  const [editProfile, setEditProfile] = useState({
    name: "",
    bio: "",
    userName: "",
  });

  const handleAvatar = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setImage(reader.result);
    };
  };

  const navigate = useNavigate();

  const getProfileData = async () => {
    const token = "Bearer" + " " + localStorage.getItem("token");

    try {
      const response = await axios.get(`${baseUrl}/profile`, {
        headers: {
          authorization: token,
        },
      });

      localStorage.removeItem("avatar");
      localStorage.setItem("avatar", response.data.data.avatar);
      dispatch({ type: "GET_PROFILE", payload: response.data.data });
    } catch (error) {}
  };

  console.log(imag);

  const editProfileHandler = async () => {
    const encodedToken = `Bearer ${localStorage.getItem("token")}`;

    try {
      const name = editProfile.name;
      const bio = editProfile.bio;
      const image = imag;
      const userName = editProfile.userName;

      const response = await axios.post(
        `${baseUrl}/editProfile`,
        { name: name, bio: bio, image: image, userName: userName },
        {
          headers: { authorization: encodedToken },
        }
      );

      dispatch({ type: "UPDATE_PROFILE", payload: response.data.data });
    } catch (e) {
      console.error(e);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getallusers`);

      if (response.status === 200) {
        dispatch({ type: "GET_ALL_USERS", payload: response.data.data });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProfileData();
    getAllUsers();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        getProfileData,
        state,
        editProfileHandler,
        editProfile,
        setEditProfile,
        handleAvatar,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
