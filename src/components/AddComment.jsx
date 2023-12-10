/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "../assets/comment.css";
import { COMMENT_STATUS } from "../contants/commentConfig";
import { v4 as uuidv4 } from "uuid";
import { commentDataBackUp } from "../helper";

const AddComment = ({
  heading,
  data,
  onChange,
  edit,
  useCase,
  commentConfig,
}) => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  // const { scrollRef } = useContext(CommentContext);
  const scrollRef = useRef(null);

  const disableName = heading == COMMENT_STATUS.EDIT;
  const disablePost = !!comment && !!name;

  const handelEdit = (e) => setComment(e.target.value);
  const handleNameEdit = (e) => setName(e.target.value);

  useEffect(() => {
    if (useCase === COMMENT_STATUS.EDIT) {
      setComment(data?.comment || "");
      setName(data?.name || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (performance.navigation.type === 1) {
      scrollRef.current.scrollIntoView(true);
    } else {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = () => {
    const newConfig = {
      id: uuidv4(),
      name,
      comment,
      creationTime: Date.now(),
      modifiedTime: Date.now(),
      isEditing: false,
    };
    switch (useCase) {
      case COMMENT_STATUS.EDIT: {
        data.comment = comment;
        data.modifiedTime = Date.now();
        onChange(!edit);
        commentConfig && commentDataBackUp(commentConfig);
        break;
      }
      case COMMENT_STATUS.REPLY: {
        if (data.child === undefined) {
          data.child = [{ ...newConfig }];
        } else {
          data.child = [...data.child, { ...newConfig, isEditing: true }];
        }
        commentConfig && commentDataBackUp(commentConfig);
        onChange(!edit);
        break;
      }
      default: {
        onChange(newConfig);
        commentConfig &&
          commentDataBackUp([...commentConfig, { ...newConfig }]);
        setComment("");
        setName("");
        break;
      }
    }
  };
  return (
    <div>
      <div className="comments" ref={scrollRef}>
        <section>{heading || "Comment"}</section>
        <div className="new-comment">
          <input
            value={name}
            onChange={handleNameEdit}
            disabled={disableName}
            placeholder="Name"
          />
          <textarea
            value={comment}
            onChange={handelEdit}
            placeholder="Comment"
            rows={3}
          />
        </div>
        <div className="btn-post">
          <button
            className={`btn-post-button ${!disablePost ? "btn-disabled" : ""}`}
            onClick={handleSubmit}
            disabled={!disablePost}
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
