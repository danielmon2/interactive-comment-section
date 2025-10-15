const Comment = (props) => {
  return (
    <div className={props.reply === true ? "reply" : "comment"}>
      <button className="upvote-btn">{props.score}</button>
      <div>
        <div className="comment-top-row">
          {/* Check if images work */}
          <img className="avatar" src={props.user.image.png}></img>
          {/* <img className="avatar" src={props.user.image.webp}></img> */}
          <p>{props.user.username}</p>
          {props.user.username === props.currentUser ? <span>You</span> : ""}
          <p>{props.createdAt}</p>
          {props.user.username === props.currentUser ? (
            <div>
              <button>Delete</button>
              <button>Edit</button>
            </div>
          ) : (
            <button>Reply</button>
          )}
        </div>
        <p>
          {props.replyingTo !== undefined ? (
            <span className="replyingTo">{"@" + props.replyingTo + " "}</span>
          ) : (
            ""
          )}
          {props.content}
        </p>
      </div>
    </div>
  );
};

export default Comment;
