import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import baseUrl from "../utils/baseUrl";
import { toast } from "react-toastify";

const BookMarkContext = createContext();

export const BookMarkProvider = ({ children }) => {
  const addToBookMark = async (id) => {
    try {
      const response = await axios.post(
        `${baseUrl}/bookmark`,
        { postId: id },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status === 200) {
        toast.success(response.data.message);
      }

      if (response.data.status === 409) {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookMark = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getbookmark`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("hii");

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookMark();
    console.log("hello");
  }, []);
  return (
    <BookMarkContext.Provider value={{ addToBookMark, getBookMark }}>
      {children}
    </BookMarkContext.Provider>
  );
};

export const useBookMark = () => useContext(BookMarkContext);
