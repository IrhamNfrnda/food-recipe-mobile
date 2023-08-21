import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({});

  // Load user data from AsyncStorage on app startup
  useEffect(() => {
    async function loadUserData() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }

    loadUserData();
  }, []);

  // Save user data to AsyncStorage whenever it changes
  useEffect(() => {
    async function saveUserData() {
      try {
        if (token) {
          await AsyncStorage.setItem('token', token);
        } else {
          await AsyncStorage.removeItem('token');
        }

        if (Object.keys(user).length > 0) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }

    saveUserData();
  }, [token, user]);

  return (
    <AppContext.Provider value={{
      token, setToken,
      recipes, setRecipes,
      user, setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
