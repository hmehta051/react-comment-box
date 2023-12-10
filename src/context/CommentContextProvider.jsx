/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  const [commentConfig, setCommentConfig] = useState([]);
  const handleAddComment = (comment) => {
    const newCommentConfig = [...commentConfig, comment];
    setCommentConfig(newCommentConfig);
  };

  return (
    <CommentContext.Provider
      value={{
        commentConfig,
        setCommentConfig,
        handleAddComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
