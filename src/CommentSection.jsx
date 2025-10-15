import jsonData from "/data/data.json";
// import jsonData from "/data/test.json";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import changeCommentState, {
  deleteReplyForm,
  UserComment,
} from "./ModifyCommentState";

const CommentSection = () => {
  const currentUser = jsonData.currentUser;
  const [comments, setComments] = useState(jsonData.comments);
  const [isCommentRated, setIsCommentRated] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Id of the comment it was opened on
  const handleOpenDeleteModal = (id) => {
    setDeleteModalOpen([true, id]);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen([false, -1]);
  };

  const handleDeleteUserComment = (id) => {
    setComments(changeCommentState(comments, id, "delete"));
    setDeleteModalOpen([false, -1]);
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

  const handleEditing = (id) => {
    setComments(changeCommentState(comments, id, "edit"));
  };

  const handleNewComment = (inputData, id) => {
    if (id === 0) {
      const newComment = new UserComment(comments, inputData);
      const newComments = [...comments];
      newComments.push(newComment);
      setComments(newComments);
    } else {
      setComments(changeCommentState(comments, id, "amend_new", "", inputData));
    }
  };

  const handleReply = (id) => {
    const [newComments, sameId] = deleteReplyForm(comments, id);
    if (sameId === true) {
      setComments(newComments);
      return;
    }
    setComments(changeCommentState(newComments, id, "create_new"));
  };

  return (
    <div className="comment-section">
      {comments.map((el) => (
        <div className="comment-chain" key={"comment-chain_" + el.id}>
          <Comment
            data={el}
            key={el.id}
            currentUser={currentUser.username}
            onReply={handleReply}
            onDelete={handleOpenDeleteModal}
            onScoreChange={handleScoreChange}
            onEdit={handleEditing}
            isEdited={el.editing}
            commentRating={isCommentRated[el.id]}
          />
          {el.replies.length !== 0 && (
            <>
              <div className="line"></div>
              <div className="reply-container">
                {el.replies.map((el) => {
                  if (el.newComment) {
                    return (
                      <NewComment
                        key={el.id}
                        id={el.id}
                        image={currentUser.image}
                        createNewComment={handleNewComment}
                        isReplying={true}
                      />
                    );
                  } else {
                    return (
                      <Comment
                        key={el.id}
                        data={el}
                        currentUser={currentUser.username}
                        onReply={handleReply}
                        onDelete={handleOpenDeleteModal}
                        onScoreChange={handleScoreChange}
                        onEdit={handleEditing}
                        commentRating={isCommentRated[el.id]}
                      />
                    );
                  }
                })}
              </div>
            </>
          )}
        </div>
      ))}
      <NewComment
        id={0}
        image={currentUser.image}
        createNewComment={handleNewComment}
        isReplying={false}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteUserComment}
      />
    </div>
  );
};

export default CommentSection;
