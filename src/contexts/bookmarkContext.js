import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import baseUrl from "../utils/baseUrl";
import { toast } from "react-toastify";

const BookMarkContext = createContext();

export const BookMarkProvider = ({ children }) => {
  const [bookmarkData, setBookmarkData] = useState([]);
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
      if (response.status === 200) {
        setBookmarkData(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
     console.log(error)
    }
  };

  const getBookMark = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getbookmark`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookmarkData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookMark();
  }, []);
  return (
    <BookMarkContext.Provider
      value={{ addToBookMark, getBookMark, bookmarkData }}
    >
      {children}
    </BookMarkContext.Provider>
  );
};

export const useBookMark = () => useContext(BookMarkContext);
