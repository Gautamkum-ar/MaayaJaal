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
  singleUserData: {},
  followerData: [],
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(proReducer, initialState);

  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const navigate = useNavigate();

  const getProfileData = async () => {
    setIsProfileLoading(true);
    const token = "Bearer" + " " + localStorage.getItem("token");

    try {
      const response = await axios.get(`${baseUrl}/profile`, {
        headers: {
          authorization: token,
        },
      });

      if (response.status == 200) {
        dispatch({ type: "GET_PROFILE", payload: response.data.data });

        setIsProfileLoading(false);
      }
    } catch (error) {
      setIsProfileLoading(false);
      toast.error("Something went wrong");
    }
  };

  const editProfileHandler = async (editProfile) => {
    setIsProfileLoading(true);
    const encodedToken = `Bearer ${localStorage.getItem("token")}`;

    try {
      const name = editProfile.name;
      const bio = editProfile.bio;
      const image = editProfile.avatar;
      const avatars = editProfile.avatars;
      const userName = editProfile.userName;
      const portfolio = editProfile.portfolio;

      const response = await axios.post(
        `${baseUrl}/editProfile`,
        {
          name: name,
          bio: bio,
          image: image,
          userName: userName,
          avatar: avatars,
          portFolioLink: portfolio,
        },
        {
          headers: { authorization: encodedToken },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "UPDATE_PROFILE", payload: response.data.data });
        toast.success("Porfile Updated successfully");
      }

      setIsProfileLoading(false);
    } catch (e) {
      setIsProfileLoading(false);
      toast.error(e.message);
    }
  };

  const getAllUsers = async () => {
    setIsProfileLoading(true);

    try {
      const response = await axios.get(`${baseUrl}/getallusers`);

      if (response.status === 200) {
        dispatch({ type: "GET_ALL_USERS", payload: response.data.data });
      }
      setIsProfileLoading(false);
    } catch (error) {
      setIsProfileLoading(false);

      toast.error(error.message);
    }
  };

  const followingHandler = async (id) => {
    setIsProfileLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/follow/${id}`,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch({ type: "GET_FOLLOWERS", payload: response.data.data });
      }
      setIsProfileLoading(false);
    } catch (error) {
      setIsProfileLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        getProfileData,
        state,
        dispatch,
        editProfileHandler,

        isProfileLoading,
        followingHandler,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
