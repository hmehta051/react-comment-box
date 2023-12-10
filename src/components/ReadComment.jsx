/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

import AddComment from "./AddComment";
import { COMMENT_STATUS } from "../contants/commentConfig";
import { commentDataBackUp, formatDateTime } from "../helper";

import "../assets/readComment.css";

const ReadComment = (props) => {
  const { data, commentConfig, setCommentConfig } = props;
  const [canEdit, setCanEdit] = useState(true);
  const [canReply, setCanReply] = useState(false);
  useEffect(() => {
    setCanEdit(props.isEditing);
    setCanReply(props.isEditing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEdit = () => setCanEdit(!canEdit);
  const handleReply = () => setCanReply(!canReply);

  const { name, comment, modifiedTime, child } = data || {};

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

  const handleDelete = () => {
    const presentID = data.id;
    const isDeleted = deleteComment(presentID, commentConfig);
    if (isDeleted) {
      commentConfig && commentDataBackUp(commentConfig);
      setCommentConfig([...commentConfig]);
    }
  };
  return (
    <div className="readComment">
      {canEdit ? (
        <AddComment
          heading={COMMENT_STATUS.EDIT}
          useCase={COMMENT_STATUS.EDIT}
          onChange={handleEdit}
          edit={canEdit}
          data={data}
          commentConfig={commentConfig}
          setCommentConfig={setCommentConfig}
        />
      ) : (
        <div className="reply">
          <div className="reply-header">
            <section>
              <div>{name}</div>
              <div>
                {formatDateTime(modifiedTime).formattedDate +
                  " " +
                  formatDateTime(modifiedTime).formattedTime}
              </div>
            </section>
            <div>{comment}</div>
            <button onClick={handleReply}>Reply</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
          <RiDeleteBin6Fill
            style={{
              background: "#575757",
              color: "white",
              borderRadius: "50%",
              padding: "4px",
              position: "absolute",
              left: "97%",
              cursor: "pointer",
            }}
            size={24}
            onClick={handleDelete}
          />
        </div>
      )}

      <div
        style={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px" }}
      >
        {canReply && (
          <AddComment
            heading={COMMENT_STATUS.REPLY}
            useCase={COMMENT_STATUS.REPLY}
            onChange={handleReply}
            edit={canReply}
            data={data}
            commentConfig={commentConfig}
            setCommentConfig={setCommentConfig}
          />
        )}
        {child?.map((ele) => (
          <ReadComment
            data={ele}
            key={ele.id}
            commentConfig={commentConfig}
            setCommentConfig={setCommentConfig}
          />
        ))}
      </div>
    </div>
  );
};

export default ReadComment;
