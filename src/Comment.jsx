import CommentVotes from "./CommentVotes";
import ResponsiveTextarea from "./EditingTextarea";

const Comment = ({
  data,
  currentUser,
  onReply,
  onDelete,
  onScoreChange,
  onEdit,
  commentRating,
}) => {
  const isCurrentUser = data.user.username === currentUser;

  // Add @ if it's a reply
  const isReplying = (replyingTo) => {
    if (replyingTo) {
      return (
        <a href="#" className="replyingTo">
          {"@" + data.replyingTo + " "}
        </a>
      );
    }
  };

  // Add current user indicator
  const currentUserIndicator = (isCurrentUser) => {
    if (isCurrentUser) {
      return (
        <div className="current-user-indicator">
          <span>you</span>
        </div>
      );
    }
  };

  // Use different buttons if the current comment is made by the current user
  // "Reply" for others and "delete" and "edit" for current user
  const userButtons = (isCurrentUser) => {
    if (!isCurrentUser) {
      return (
        <button
          className="btn-base reply-btn gray-hover"
          onClick={() => onReply(data.id)}
        >
          <img className="btn-base-icon" src="/assets/images/icon-reply.svg" />
          Reply
        </button>
      );
    } else {
      return (
        <div className="current-user-btns">
          <button
            className="btn-base delete-btn gray-hover"
            onClick={() => onDelete(data.id)}
          >
            <img
              className="btn-base-icon"
              src="/assets/images/icon-delete.svg"
            />
            Delete
          </button>
          <button
            className="btn-base edit-btn gray-hover"
            onClick={() => onEdit(data.id)}
          >
            <img className="btn-base-icon" src="/assets/images/icon-edit.svg" />
            Edit
          </button>
        </div>
      );
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`comment-base ${!data.replyingTo ? "comment" : ""}`}>
      <CommentVotes
        score={data.score}
        id={data.id}
        onScoreChange={onScoreChange}
        isCurrentUser={isCurrentUser}
        commentRating={commentRating}
      />
      <div className="comment-wrapper">
        <div className="comment-top-row">
          <img className="avatar" src={data.user.image.png}></img>
          <p className="username">{data.user.username}</p>
          {currentUserIndicator(isCurrentUser)}
          <p className="created-at">{data.createdAt}</p>
          {userButtons(isCurrentUser)}
        </div>
        {data.editing ? (
          <form onSubmit={handleEditSubmit}>
            <ResponsiveTextarea
              defaultValue={data.content}
              autoFocus={true}
              placeholder={"Add a comment..."}
              name={"editTextarea"}
            />
            <button type="submit" className="btn-base update-btn">
              Update
            </button>
          </form>
        ) : (
          <p className="content">
            {isReplying(data.replyingTo)}
            {data.content}
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;
