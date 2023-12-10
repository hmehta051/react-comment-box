/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { commentDataBackUp } from "../helper";

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  const [commentConfig, setCommentConfig] = useState([]);
  const handleAddComment = (comment) => {
    const newCommentConfig = [...commentConfig, comment];
    setCommentConfig(newCommentConfig);
  };

  const deleteComment = (id, commentConfig) => {
    for (let i = 0; i < commentConfig.length; i++) {
      if (commentConfig[i].id === id) {
        delete commentConfig[i].child;
        commentConfig.splice(i, 1);
        return true;
      } else if (
        Array.isArray(commentConfig[i].child) &&
        commentConfig[i].child.length > 0
      ) {
        const childDeleted = deleteComment(id, commentConfig[i].child);
        if (childDeleted) return true;
      }
    }
    return false;
  };

  const handleDelete = (data) => {
    const presentID = data.id;
    const isDeleted = deleteComment(presentID, commentConfig);
    if (isDeleted) {
      commentConfig && commentDataBackUp(commentConfig);
      setCommentConfig([...commentConfig]);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        commentConfig,
        setCommentConfig,
        handleAddComment,
        handleDelete,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
