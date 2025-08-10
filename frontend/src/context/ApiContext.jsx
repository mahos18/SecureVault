import React, { createContext, useContext } from "react";

// Create Context
const ApiContext = createContext();

// Provider Component
export const ApiProvider = ({ children }) => {
  // You can switch between local and deployed URLs easily
  const backend_url = "https://secure-vault-backend-dvj5.onrender.com";

  return (
    <ApiContext.Provider value={{ backend_url }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
