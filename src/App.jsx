import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import ContentPage from "./pages/ContentPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-new-content"
            element={
              <PrivateRoute>
                <CreateProjectPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <ExplorePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/content"
            element={
              <PrivateRoute>
                <ContentPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
