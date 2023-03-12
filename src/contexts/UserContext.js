import React, { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const contextValue = {
    posts,
    setPosts,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export { MyContext, MyProvider };
