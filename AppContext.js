import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({});
  
    return (
      <AppContext.Provider value={{ token, setToken, recipes, setRecipes, user, setUser }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export default AppProvider;
  