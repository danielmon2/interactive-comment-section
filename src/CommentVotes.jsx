const CommentVotes = ({
  score,
  id,
  onScoreChange,
  isCurrentUser,
  commentRating,
}) => {
  const disableBtn = (isCurrentUser) => {
    if (isCurrentUser) {
      return "disabled-btn";
    } else {
      return "gray-hover";
    }
  };

  return (
    <div className="vote-container">
      <button
        className={`gray-box-centered upvote-btn ${disableBtn(isCurrentUser)}`}
        disabled={isCurrentUser}
        onClick={() => onScoreChange(id, "upvote")}
      >
        <img
          className={commentRating === "upvote" ? "purple-filter" : ""}
          src="/assets/images/icon-plus.svg"
        />
      </button>

      <div className="gray-box-centered">
        <span>{score}</span>
      </div>

      <button
        className={`gray-box-centered downvote-btn ${disableBtn(isCurrentUser)}`}
        disabled={isCurrentUser}
        onClick={() => onScoreChange(id, "downvote")}
      >
        <img
          className={commentRating === "downvote" ? "purple-filter" : ""}
          src="/assets/images/icon-minus.svg"
        />
      </button>
    </div>
  );
};

export default CommentVotes;
