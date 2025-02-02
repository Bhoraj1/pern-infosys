import React, { createContext, useState, useContext } from "react";

// Create Context
const LoaderContext = createContext();

// Create Provider
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Custom Hook to use Loader
export const useLoader = () => useContext(LoaderContext);
