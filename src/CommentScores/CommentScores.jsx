import "./CommentScores.css";

const CommentVotes = ({
  score,
  id,
  onScoreChange,
  isCurrentUser,
  commentRating,
}) => {
  const disableBtn = (isCurrentUser) => {
    if (isCurrentUser) {
      return "btn--disabled";
    } else {
      return "gray-hover";
    }
  };

  const formattedNum = (num) => {
    return num.toLocaleString("en", { useGrouping: true });
  };

  return (
    <div className="score-container">
      <button
        className={
          "score-container__gray-box--centered btn score-container__upvote-btn " +
          disableBtn(isCurrentUser)
        }
        disabled={isCurrentUser}
        onClick={() => onScoreChange(id, "upvote")}
      >
        <img
          className={commentRating === "upvote" ? "purple-filter" : ""}
          src="/assets/images/icon-plus.svg"
        />
      </button>

      <div className="score-container__gray-box--centered">
        <span className="score-container__score">{formattedNum(score)}</span>
      </div>

      <button
        className={`score-container__gray-box--centered btn score-container__downvote-btn ${disableBtn(isCurrentUser)}`}
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
