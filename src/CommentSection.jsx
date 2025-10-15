import jsonData from "/data/data.json";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const CommentSection = () => {
  const comments = jsonData.comments;
  const currentUser = jsonData.currentUser;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="comment-section">
      {comments.map((el) => (
        <div className="comment-chain" key={"comment-chain_" + el.id}>
          <Comment
            reply={false}
            score={el.score}
            username={el.user.username}
            image={el.user.image}
            createdAt={el.createdAt}
            content={el.content}
            key={el.id}
            currentUser={currentUser.username}
            onDelete={handleOpenDeleteModal}
          />
          {el.replies.length !== 0 ? (
            <div className="reply-container">
              <div className="line"></div>
              <div>
                {el.replies.map((el) => (
                  <Comment
                    score={el.score}
                    username={el.user.username}
                    image={el.user.image}
                    createdAt={el.createdAt}
                    content={el.content}
                    key={el.id}
                    replyingTo={el.replyingTo}
                    currentUser={currentUser.username}
                    onDelete={handleOpenDeleteModal}
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
