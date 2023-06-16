import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { ProfileContextProvider } from "./contexts/profileContext";
import { PostContextProvider } from "./contexts/postContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProfileContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


