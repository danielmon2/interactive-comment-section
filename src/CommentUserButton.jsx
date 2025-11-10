import "./Comment/Comment.css";

const CommentUserButton = ({
  isCurrentUser,
  onDelete,
  onEdit,
  onReply,
  id,
}) => {
  // Use different buttons if the current comment is made by the current user
  // "Reply" for others and "delete" and "edit" for current user
  if (!isCurrentUser) {
    return (
      <button
        className="comment__btn--reply btn comment__btn purple-text white-bg gray-hover"
        onClick={() => onReply(id)}
      >
        <img className="comment__btn__icon" src="images/icon-reply.svg" />
        Reply
      </button>
    );
  } else {
    return (
      <div className="comment__btn--user">
        <button
          className="btn comment__btn red-text white-bg gray-hover"
          onClick={() => onDelete(id)}
        >
          <img className="comment__btn__icon" src="images/icon-delete.svg" />
          Delete
        </button>
        <button
          className="btn comment__btn purple-text white-bg gray-hover"
          onClick={() => onEdit(id)}
        >
          <img className="comment__btn__icon" src="images/icon-edit.svg" />
          Edit
        </button>
      </div>
    );
  }
};

export default CommentUserButton;
