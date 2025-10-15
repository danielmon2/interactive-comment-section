import jsonData from "/data/data.json";
import Comment from "./Comment";
import NewComment from "./NewComment";

const CommentSection = () => {
  const comments = jsonData.comments;
  const currentUser = jsonData.currentUser;
  return (
    <div className="comment-section">
      {comments.map((el) => (
        <div className="comment-chain" key={"comment-chain_" + el.id}>
          <Comment
            reply={false}
            score={el.score}
            user={el.user}
            createdAt={el.createdAt}
            content={el.content}
            key={el.id}
            currentUser={currentUser.username}
          />
          {el.replies.length !== 0 ? (
            <div className="reply-container">
              <div className="line"></div>
              {el.replies.map((el) => (
                <Comment
                  reply={true}
                  score={el.score}
                  user={el.user}
                  createdAt={el.createdAt}
                  content={el.content}
                  key={el.id}
                  replyingTo={el.replyingTo}
                  currentUser={currentUser.username}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
      <NewComment image={currentUser.image} />
    </div>
  );
};

export default CommentSection;
