const Comment = (props) => {
  return (
    <div className="comment-container">
      <div className={props.reply === true ? "reply" : "comment"}>
        <button className="upvote-btn">{props.score}</button>
        <div>
          <div>
            {/* Check if images work */}
            <img className="avatar" src={props.user.image.png}></img>
            {/* <img className="avatar" src={props.user.image.webp}></img> */}
            <p>{props.user.username}</p>
            <p>{props.createdAt}</p>
            {props.user.username === props.currentUser ? (
              <button>Delete</button>
            ) : (
              ""
            )}
            <button>
              {props.user.username === props.currentUser ? "Edit" : "Reply"}
            </button>
          </div>
          <p>{props.content}</p>
        </div>
      </div>
      {props.replies !== undefined
        ? props.replies.map((el) => (
            <Comment
              reply={true}
              score={el.score}
              user={el.user}
              createdAt={el.createdAt}
              content={el.content}
              key={el.id}
              replies={el.replies}
              currentUser={props.currentUser}
            />
          ))
        : ""}
    </div>
  );
};

export default Comment;
