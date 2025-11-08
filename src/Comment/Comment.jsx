import CommentVotes from "../CommentScores/CommentScores";
import CommentUserButton from "../CommentUserButton";
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
      return <span className="comment__info__current-user-indicator">you</span>;
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

  let commentClassName = "comment comment__grid";
  if (!data.replyingTo) {
    commentClassName = commentClassName + " comment--full-row";
  }

  return (
    <article className={commentClassName}>
      <CommentVotes
        score={data.score}
        id={data.id}
        onScoreChange={onScoreChange}
        isCurrentUser={isCurrentUser}
        commentRating={commentRating}
      />
      <p className="comment__info">
        <img className="comment__info__avatar" src={data.user.image.png}></img>
        <span className="comment__info__username">{data.user.username}</span>
        {currentUserIndicator(isCurrentUser)}
        <span className="comment__info__created-at">{data.createdAt}</span>
      </p>
      <CommentUserButton
        isCurrentUser={isCurrentUser}
        onDelete={onDelete}
        onEdit={onEdit}
        onReply={onReply}
        id={data.id}
      />
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
            UPDATE
          </button>
        </form>
      ) : (
        <p className="comment__content">
          {isReplying(data.replyingTo)}
          {data.content}
        </p>
      )}
    </article>
  );
};

export default Comment;
