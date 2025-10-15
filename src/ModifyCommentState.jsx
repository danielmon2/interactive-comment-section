/*
  Change Score (search + prev value)

  Delete comment (search)

  Add new comments
    Add temporary comment (search)

    Replace it with a proper one (search)

  Edit comment
    Fetch content (search)

    Change content (search)

  id, optional: action, property;
    search
      copies the state but doesnt change it

    Decide what to do with the copy

  Selective deep copy func
*/
class UserComment {
  constructor(comments, content) {
    this.id = getNewId(comments);
    this.content = content;
    this.createdAt = "1 second ago";
    this.score = 0;
    this.user = {
      image: {
        png: "./assets/images/avatars/image-juliusomo.png",
        webp: "./assets/images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    };
    this.replies = [];
  }
}

class UserReply extends UserComment {
  constructor(comments, content, replyingTo) {
    super(comments, content);
    this.replyingTo = replyingTo;
    delete this.replies;
  }
}

const calculateNewScore = (isCommentRated, id, action, score) => {
  // Check if user already scored this comment
  if (id in isCommentRated) {
    // Check whether it was the same action
    if (isCommentRated[id] === action) {
      // If yes - erase it
      // ...rest when using spread (deletes a value and leaves the rest).
      // If object key is in a variable, it has to have ": something"
      const { [id]: removed, ...newRatings } = isCommentRated;
      if (action === "upvote") return [score - 1, newRatings];
      else return [score + 1, newRatings];
    } else {
      // If not - reverse it
      const newRatings = { ...isCommentRated, [id]: action };
      if (action === "upvote") return [score + 2, newRatings];
      else return [score - 2, newRatings];
    }
  } else {
    // Add new action to the list
    const newRatings = { ...isCommentRated, [id]: action };
    if (action === "upvote") return [score + 1, newRatings];
    else return [score - 1, newRatings];
  }
};

const changeCommentState = (comments, id, action, isCommentRated, input) => {
  // Entries() because it doesn't work without it (if array has objects in it)
  for (const [index, el] of comments.entries()) {
    if (el.id === id) {
      const newComments = [...comments];
      newComments[index] = { ...comments[index] };

      if (action === "delete") {
        newComments.splice(index, 1);
      } else if (action === "upvote" || action === "downvote") {
        const [newScore, newRatings] = calculateNewScore(
          isCommentRated,
          id,
          action,
          newComments[index].score,
        );
        newComments[index].score = newScore;
        return [newRatings, newComments];
      } else if (action === "create_new") {
        const newComment = new UserReply(comments, "", el.user.username);
        newComment.newComment = true;

        newComments[index].replies = [...comments[index].replies];
        newComments[index].replies.splice(0, 0, newComment);
      }
      return newComments;
    }
    if (el.replies.length !== 0) {
      const parentIndex = index;
      const parentEl = el.replies;
      for (const [index, el] of parentEl.entries()) {
        if (el.id === id) {
          // Shallow copy (spread) makes a copy of the top-most layer.
          // Objects, arrays even at the top-most layer are treated as nested
          // If you want to change something inside one you have to copy it (if you want to replace it you don't)
          // I make a shallow copy of each layer I go down
          // Comments array -> specific comment object -> array of all replies of that comment -> specific reply object
          // I'm assuming this will be faster then a deep copy, because here you copy only necessary items
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          newComments[parentIndex].replies[index] = {
            ...comments[parentIndex].replies[index],
          };

          if (action === "delete") {
            newComments[parentIndex].replies.splice(index, 1);
          } else if (action === "upvote" || action === "downvote") {
            const [newScore, newRatings] = calculateNewScore(
              isCommentRated,
              id,
              action,
              newComments[parentIndex].replies[index].score,
            );
            newComments[parentIndex].replies[index].score = newScore;
            return [newRatings, newComments];
          } else if (action === "create_new") {
            const newComment = new UserReply(comments, "", el.user.username);
            newComment.newComment = true;

            newComments[parentIndex].replies.splice(index + 1, 0, newComment);
          } else if (action === "amend_new") {
            delete newComments[parentIndex].replies[index].newComment;
            newComments[parentIndex].replies[index].content = input;
          }
          return newComments;
        }
      }
    }
  }
};

const getNewId = (comments) => {
  let biggestId = 0;
  for (const el of comments) {
    if (el.id > biggestId) {
      biggestId = el.id;
    }
    if (el.replies.length !== 0) {
      const parentEl = el.replies;
      for (const el of parentEl) {
        if (el.id > biggestId) {
          biggestId = el.id;
        }
      }
    }
  }

  return biggestId + 1;
};

const deleteReplyForm = (comments, id) => {
  let sameId = false;

  for (const [index, el] of comments.entries()) {
    if (el.replies.length !== 0) {
      const parentEl = el;
      const parentIndex = index;

      for (const [index, el] of parentEl.replies.entries()) {
        if (el.newComment) {
          if (index === 0 && parentEl.id === id) {
            sameId = true;
          } else if (index !== 0 && index < parentEl.replies.length) {
            if (parentEl.replies[index - 1].id === id) {
              sameId = true;
            }
          }

          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          newComments[parentIndex].replies.splice(index, 1);
          return [newComments, sameId];
        }
      }
    }
  }

  return [comments, sameId];
};
export default changeCommentState;
export { getNewId, deleteReplyForm, UserComment };
