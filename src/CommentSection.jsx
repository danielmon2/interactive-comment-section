import jsonData from "/data/data.json";
import Comment from "./Comment";
import NewComment from "./NewComment";

const CommentSection = () => {
  const comments = jsonData.comments;
  const currentUser = jsonData.currentUser;
  return (
    <div className="comment-section">
      {comments.map((el) => (
        <Comment
          reply={false}
          score={el.score}
          user={el.user}
          createdAt={el.createdAt}
          content={el.content}
          key={el.id}
          replies={el.replies}
          currentUser={currentUser.username}
        />
      ))}
      <NewComment image={currentUser.image} />
    </div>
  );
};

export default CommentSection;
