import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import ProfilePage from './pages/ProfilePage'
import CreatePage from './pages/ExplorePage'
import ExplorePage from './pages/ExplorePage'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<LoginPage />} />

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
          path="/explore"
          element={
            <PrivateRoute>
              <ExplorePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
