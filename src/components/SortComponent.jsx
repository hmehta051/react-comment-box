/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { SORT_TEXT } from "../contants/commentConfig";
import { CommentContext } from "../context/CommentContextProvider";

export const SortComment = () => {
  const { commentConfig, setCommentConfig } = useContext(CommentContext);
  const [toggleSort, setToggleSort] = useState(false);

  const handleSort = () => {
    let newCommentConfig;
    setToggleSort((toggle) => !toggle);
    newCommentConfig = commentConfig.sort((a, b) =>
      toggleSort
        ? b.modifiedTime - a.modifiedTime
        : a.modifiedTime - b.modifiedTime
    );

    setCommentConfig([...newCommentConfig]);
  };

  return (
    <div className="sortBlock" onClick={handleSort}>
      {SORT_TEXT} {!toggleSort ? <>&darr;</> : <>&uarr;</>}
    </div>
  );
};
