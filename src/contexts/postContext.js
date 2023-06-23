import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import baseUrl from "../utils/baseUrl";
import { postReducer } from "../reducers/postReduce/postReducer";
import { toast } from "react-toastify";

const PostContext = createContext();

const initialState = {
  postData: [],
  editpost: {},
  likePostData: [],
  commentData: [],
};

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const [toggleEditPost, setToggleEditPost] = useState(false);
  const [isPostLoading, setIsLoading] = useState(false);
  const [createPost, setCreatePost] = useState({
    caption: "",
    imageUrl: "",
  });

  const [editPostData, setEditPostData] = useState({
    caption: "",
  });

  // get all post

  const getAllPosthandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/getallpost`);

      dispatch({ type: "GET_POST", payload: response.data.data });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const createPostHandler = async () => {
    const encodedToken = `Bearer ${localStorage.getItem("token")}`;
    const caption = createPost.caption;
    const image = createPost.imageUrl;

    try {
      const response = await axios.post(
        `${baseUrl}/createpost`,
        { caption, image },
        {
          headers: { authorization: encodedToken },
        }
      );

      setIsLoading(false);

      console.log(response);
      if (response.status === 200) {
        dispatch({ type: "CREATE__POST", payload: response.data.post });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.status === 400) {
        toast.error(error.message);
      }
    }
  };

  const editPosthandler = async (id) => {
    const caption = editPostData.caption;
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${baseUrl}/editpost/${id}`,
        {
          caption: caption,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setIsLoading(false);
      getAllPosthandler();
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deletePostHandler = async (id) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`${baseUrl}/deletepost/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch({ type: "DELETE_POST", payload: response.data.data });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const likePostHandler = async (id) => {
    console.log(id);
    const encodedToken = `Bearer ${localStorage.getItem("token")}`;
    try {
      const response = await axios.put(
        `${baseUrl}/likes/${id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch({ type: "LIKE_POST", payload: response.data });
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///comments api

  const getCommentHandler = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getcomment`);
      if(response.status===200){
        dispatch({type:"GET_COMMENT",payload:response.data.data})
      }
    } catch (error) {
      console.log(error);
    }
  };
  const commentHandler = async (id, commentInput) => {
    try {
      const response = await axios.post(
        `${baseUrl}/comment/${id}`,
        {
          comment: commentInput,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch({ type: "POST_COMMENT", payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentHandler = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/deletecomment/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200) {
        dispatch({ type: "DELETE_COMMENT", payload: response.data.data });
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const posts = state.postData;
  useEffect(() => {
    getAllPosthandler();
    getCommentHandler();
  }, []);

  return (
    <PostContext.Provider
      value={{
        createPostHandler,
        setCreatePost,
        createPost,
        state,
        setEditPostData,
        editPostData,
        editPosthandler,
        setToggleEditPost,
        toggleEditPost,
        deletePostHandler,
        dispatch,
        isPostLoading,
        posts,
        likePostHandler,
        commentHandler,
        deleteCommentHandler,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
