import DeleteModal from "./DeleteModal";

const Comment = ({
  score,
  id,
  username,
  image,
  createdAt,
  content,
  replyingTo,
  currentUser,
  onDelete,
  onUpvote,
  onDownvote,
}) => {
  // Add @ if it's a reply
  let answerTo = "";
  if (replyingTo !== undefined) {
    answerTo = (
      <a href="#" className="replyingTo">
        {"@" + replyingTo + " "}
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

  if (username === currentUser) {
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
        <button className="upvote-btn" onClick={() => onUpvote(id)}></button>
        <div>
          <span>{score}</span>
        </div>
        <button
          className="downvote-btn"
          onClick={() => onDownvote(id)}
        ></button>
      </div>

      <div>
        <div className="comment-top-row">
          <img className="avatar" src={image.png}></img>
          <p className="username">{username}</p>
          {currentUserIndicator}
          <p className="created-at">{createdAt}</p>
          {userButtons}
        </div>
        <p>
          {answerTo}
          {content}
        </p>
      </div>
    </div>
  );
};

export default Comment;
