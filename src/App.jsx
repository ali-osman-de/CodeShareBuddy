import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import store from './store/store'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import ProfilePage from './pages/ProfilePage'
import ExplorePage from './pages/ExplorePage'
import ContentPage from './pages/ContentPage'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/explore" element={<PrivateRoute><ExplorePage /></PrivateRoute>} />
          <Route path="/content" element={<PrivateRoute><ContentPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
