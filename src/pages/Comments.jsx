/* eslint-disable react/prop-types */
import { useEffect, useContext } from "react";

import AddComment from "../components/AddComment";
import ReadComment from "../components/ReadComment";
import { getLocalStorage } from "../helper";
import { SortComment } from "../components/SortComponent";
import { CommentContext } from "../context/CommentContextProvider";

const CommentRenderer = (props) => {
  const { commentConfig, setCommentConfig } = props;
  // if (commentConfig.length === 0) return <h2>Loading...</h2>;
  return commentConfig.map((commentData) => {
    return (
      <ReadComment
        data={commentData}
        key={commentData.id}
        commentConfig={commentConfig}
        setCommentConfig={setCommentConfig}
      />
    );
  });
};

const Comments = () => {
  const { handleAddComment, commentConfig, setCommentConfig } =
    useContext(CommentContext);

  useEffect(() => {
    setCommentConfig(getLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="commentBlock">
      <AddComment onChange={handleAddComment} commentConfig={commentConfig} />
      {!!commentConfig.length && <SortComment />}
      <CommentRenderer
        commentConfig={commentConfig}
        setCommentConfig={setCommentConfig}
      />
    </div>
  );
};

export default Comments;
