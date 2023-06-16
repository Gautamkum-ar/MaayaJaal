import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import baseUrl from "../utils/baseUrl";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [createPost, setCreatePost] = useState({
    caption: "",
  });

  const [posts, setPosts] = useState([]);

  const getAllPosthandler = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getallpost`);

      setPosts(response.data.data);
    } catch (error) {}
  };

  const createPostHandler = async () => {
    const encodedToken = `Bearer ${localStorage.getItem("token")}`;
    const caption = createPost.caption;
    try {
      const response = await axios.post(
        `${baseUrl}/createpost`,
        { caption },
        {
          headers: { authorization: encodedToken },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosthandler();
  }, []);

  //   console.log(createPost);
  return (
    <PostContext.Provider
      value={{ createPostHandler, setCreatePost, createPost, posts }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
