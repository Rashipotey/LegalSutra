"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    // In a real app, you would validate credentials with an API
    // For demo purposes, we'll just store the user in localStorage
    localStorage.setItem("user", JSON.stringify(userData))
    setCurrentUser(userData)
    return true
  }

  const signup = (userData) => {
    // In a real app, you would register the user with an API
    // For demo purposes, we'll just store the user in localStorage
    localStorage.setItem("user", JSON.stringify(userData))
    setCurrentUser(userData)
    return true
  }

  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

