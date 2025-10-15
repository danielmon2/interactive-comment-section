import DeleteModal from "./DeleteModal";

const Comment = ({ score, data, currentUser, onDelete, onScoreChange }) => {
  // Add @ if it's a reply
  let answerTo = "";
  if (data.replyingTo) {
    answerTo = (
      <a href="#" className="replyingTo">
        {"@" + data.replyingTo + " "}
      </a>
    );
  }

  let currentUserIndicator = "";
  let userButtons = (
    <button className="reply-btn">
      <img src="/assets/images/icon-reply.svg" />
      Reply
    </button>
  );

  if (data.user.username === currentUser) {
    // Add current user indicator
    currentUserIndicator = (
      <div className="current-user-indicator">
        <span>you</span>
      </div>
    );

    // Use different buttons if the current comment is made by the current user
    userButtons = (
      <div className="current-user-btns">
        <button className="delete-btn" onClick={onDelete}>
          <img src="/assets/images/icon-delete.svg" />
          Delete
        </button>
        <button className="edit-btn">
          <img src="/assets/images/icon-edit.svg" />
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="comment">
      <div className="vote-container">
        <button
          className="upvote-btn"
          onClick={() => onScoreChange(data.id, "upvote")}
        ></button>
        <div>
          <span>{score}</span>
        </div>
        <button
          className="downvote-btn"
          onClick={() => onScoreChange(data.id, "downvote")}
        ></button>
      </div>

      <div>
        <div className="comment-top-row">
          <img className="avatar" src={data.user.image.png}></img>
          <p className="username">{data.user.username}</p>
          {currentUserIndicator}
          <p className="created-at">{data.createdAt}</p>
          {userButtons}
        </div>
        <p>
          {answerTo}
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default Comment;
