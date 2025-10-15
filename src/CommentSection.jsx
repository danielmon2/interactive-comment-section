import jsonData from "/data/data.json";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

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

  const calculateNewScore = (id, action, score) => {
    // Check if user already scored this comment
    if (id in isCommentRated) {
      // Check whether it was the same action
      if (isCommentRated[id] === action) {
        // If yes - erase it
        setIsCommentRated((current) => {
          const newRatings = { ...current };
          delete newRatings[id];
          return newRatings;
        });
        if (action === "upvote") return score - 1;
        else return score + 1;
      } else {
        // If not - reverse it
        setIsCommentRated({ ...isCommentRated, [id]: action });
        if (action === "upvote") return score + 2;
        else return score - 2;
      }
    } else {
      // Add new action to the list
      setIsCommentRated({ ...isCommentRated, [id]: action });
      if (action === "upvote") return score + 1;
      else return score - 1;
    }
  };

  const handleScoreChange = (id, action) => {
    comments.forEach((el, index) => {
      if (el.id === id) {
        const newScore = calculateNewScore(id, action, el.score);
        const newComments = [...comments];
        newComments[index] = { ...comments[index], score: newScore };
        setComments(newComments);
        return;
      }
      if (el.replies.length !== 0) {
        const parentIndex = index;
        el.replies.forEach((el, index) => {
          if (el.id === id) {
            // Shallow copy (spread) makes a copy of the top-most layer.
            // Objects, arrays even at the top-most layer are treated as nested
            // If you want to change something inside one you have to copy it (if you want to replace it you don't)
            // I make a shallow copy of each layer I go down
            // Comments array -> specific comment object -> array of all replies of that comment -> specific reply object
            // I'm assuming this will be faster then a deep copy, because here you copy only necessary items
            const newScore = calculateNewScore(id, action, el.score);
            const newComments = [...comments];
            newComments[parentIndex] = { ...comments[parentIndex] };
            newComments[parentIndex].replies = [
              ...comments[parentIndex].replies,
            ];
            newComments[parentIndex].replies[index] = {
              ...comments[parentIndex].replies[index],
            };
            newComments[parentIndex].replies[index].score = newScore;
            setComments(newComments);
            return;
          }
        });
      }
    });
  };

  return (
    <div className="comment-section">
      {comments.map((el) => (
        <div className="comment-chain" key={"comment-chain_" + el.id}>
          <Comment
            score={el.score}
            data={el}
            key={el.id}
            currentUser={currentUser.username}
            onDelete={handleOpenDeleteModal}
            onScoreChange={handleScoreChange}
          />
          {el.replies.length !== 0 && (
            <div className="reply-container">
              <div className="line"></div>
              <div>
                {el.replies.map((el) => (
                  <Comment
                    key={el.id}
                    score={el.score}
                    data={el}
                    currentUser={currentUser.username}
                    onDelete={handleOpenDeleteModal}
                    onScoreChange={handleScoreChange}
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
