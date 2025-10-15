import CommentVotes from "../CommentScores/CommentScores";
import ResponsiveTextarea from "../EditingTextarea";
import "./Comment.css";

const Comment = ({
  data,
  currentUser,
  onReply,
  onDelete,
  onScoreChange,
  onEdit,
  onSubmit,
  commentRating,
}) => {
  const isCurrentUser = data.user.username === currentUser;

  // Add @ if it's a reply
  const isReplying = (replyingTo) => {
    if (replyingTo) {
      return (
        <a href="#" className="comment__content__replying-to">
          {"@" + data.replyingTo + " "}
        </a>
      );
    }
  };

  // Add current user indicator
  const currentUserIndicator = (isCurrentUser) => {
    if (isCurrentUser) {
      return (
        <div className="comment__info__current-user-indicator">
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
          className="comment__btn--edit btn comment__btn purple-text white-bg gray-hover"
          onClick={() => onReply(data.id)}
        >
          <img
            className="comment__btn__icon"
            src="/assets/images/icon-reply.svg"
          />
          Reply
        </button>
      );
    } else {
      return (
        <div className="comment__current-user-btns">
          <button
            className="btn comment__btn red-text white-bg gray-hover"
            onClick={() => onDelete(data.id)}
          >
            <img
              className="comment__btn__icon"
              src="/assets/images/icon-delete.svg"
            />
            Delete
          </button>
          <button
            className="btn comment__btn purple-text white-bg gray-hover"
            onClick={() => onEdit(data.id)}
          >
            <img
              className="comment__btn__icon"
              src="/assets/images/icon-edit.svg"
            />
            Edit
          </button>
        </div>
      );
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData.entries());

    if (inputData.editTextarea !== "") {
      onSubmit(inputData.editTextarea, data.id);
      event.target.reset();
    }
  };

  return (
    <div
      className={`comment comment__grid ${!data.replyingTo ? "comment--full-row" : ""}`}
    >
      <CommentVotes
        score={data.score}
        id={data.id}
        onScoreChange={onScoreChange}
        isCurrentUser={isCurrentUser}
        commentRating={commentRating}
      />
      <div className="comment__info">
        <img className="comment__info__avatar" src={data.user.image.png}></img>
        <p className="comment__info__username">{data.user.username}</p>
        {currentUserIndicator(isCurrentUser)}
        <p className="comment__info__created-at">{data.createdAt}</p>
      </div>
      {userButtons(isCurrentUser)}
      {data.editing ? (
        <form onSubmit={handleEditSubmit} className="comment__editing-form">
          <ResponsiveTextarea
            defaultValue={data.content}
            autoFocus={true}
            placeholder={"Add a comment..."}
            name={"editTextarea"}
          />
          <button
            type="submit"
            className="btn comment__btn editing-form__update-btn"
          >
            Update
          </button>
        </form>
      ) : (
        <p className="comment__content">
          {isReplying(data.replyingTo)}
          {data.content}
        </p>
      )}
    </div>
  );
};

export default Comment;
