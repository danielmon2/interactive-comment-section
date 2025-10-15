import jsonData from "/data/data.json";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const CommentSection = () => {
  const comments = jsonData.comments;
  const currentUser = jsonData.currentUser;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentScores, setCommentScores] = useState(calculateCommentScores);

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleUpvoteClick = (id) => {
    const newScore = commentScores[id] + 1;
    setCommentScores({ ...commentScores, [id]: newScore });
  };

  const handleDownvoteClick = (id) => {
    const newScore = commentScores[id] - 1;
    setCommentScores({ ...commentScores, [id]: newScore });
  };

  function calculateCommentScores() {
    const scores = {};
    comments.forEach((el) => {
      scores[el.id] = el.score;
      if (el.replies.length !== 0) {
        el.replies.forEach((el) => {
          scores[el.id] = el.score;
        });
      }
    });
    console.log(typeof scores);
    return scores;
  }

  return (
    <div className="comment-section">
      {comments.map((el) => (
        <div className="comment-chain" key={"comment-chain_" + el.id}>
          <Comment
            reply={false}
            score={commentScores[el.id]}
            id={el.id}
            username={el.user.username}
            image={el.user.image}
            createdAt={el.createdAt}
            content={el.content}
            key={el.id}
            currentUser={currentUser.username}
            onDelete={handleOpenDeleteModal}
            onUpvote={handleUpvoteClick}
            onDownvote={handleDownvoteClick}
          />
          {el.replies.length !== 0 ? (
            <div className="reply-container">
              <div className="line"></div>
              <div>
                {el.replies.map((el) => (
                  <Comment
                    score={commentScores[el.id]}
                    id={el.id}
                    username={el.user.username}
                    image={el.user.image}
                    createdAt={el.createdAt}
                    content={el.content}
                    key={el.id}
                    replyingTo={el.replyingTo}
                    currentUser={currentUser.username}
                    onDelete={handleOpenDeleteModal}
                    onUpvote={handleUpvoteClick}
                    onDownvote={handleDownvoteClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
      <NewComment image={currentUser.image} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default CommentSection;
