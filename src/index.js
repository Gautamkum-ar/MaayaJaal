import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { ProfileContextProvider } from "./contexts/profileContext";
import { PostContextProvider } from "./contexts/postContext";
import { BookMarkProvider } from "./contexts/bookmarkContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ProfileContextProvider>
        <PostContextProvider>
          <BookMarkProvider>
            <App />
          </BookMarkProvider>
        </PostContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);


