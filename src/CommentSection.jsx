import jsonData from "/data/data.json";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import changeCommentState, { calculateNewScore } from "./ModifyCommentState";

const CommentSection = () => {
  const currentUser = jsonData.currentUser;
  const [comments, setComments] = useState(jsonData.comments);
  const [isCommentRated, setIsCommentRated] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleScoreChange = (id, action) => {
    const [newRatings, newComments] = changeCommentState(
      comments,
      id,
      action,
      isCommentRated,
    );
    setComments(newComments);
    setIsCommentRated(newRatings);
  };

  return (
    <div className="comment-section">
      {comments.map((el) => (
        <div className="comment-chain" key={"comment-chain_" + el.id}>
          <Comment
            data={el}
            key={el.id}
            currentUser={currentUser.username}
            onDelete={handleOpenDeleteModal}
            onScoreChange={handleScoreChange}
            commentRating={isCommentRated[el.id]}
          />
          {el.replies.length !== 0 && (
            <div className="reply-container">
              <div className="line"></div>
              <div>
                {el.replies.map((el) => (
                  <Comment
                    key={el.id}
                    data={el}
                    currentUser={currentUser.username}
                    onDelete={handleOpenDeleteModal}
                    onScoreChange={handleScoreChange}
                    commentRating={isCommentRated[el.id]}
                  />
                ))}
              </div>
            </div>
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
