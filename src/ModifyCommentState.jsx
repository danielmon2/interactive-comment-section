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

const changeCommentScore = (comments, id, action, isCommentRated) => {
  // Entries() because it doesn't work without it (if array has objects in it)
  for (const [index, el] of comments.entries()) {
    if (el.id === id) {
      const newComments = [...comments];
      newComments[index] = { ...comments[index] };

      const [newScore, newRatings] = calculateNewScore(
        isCommentRated,
        id,
        action,
        newComments[index].score,
      );
      newComments[index].score = newScore;
      return [newRatings, newComments];
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
          // I'm assuming this will be faster than a deep copy, because here you copy only necessary items
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          newComments[parentIndex].replies[index] = {
            ...comments[parentIndex].replies[index],
          };

          const [newScore, newRatings] = calculateNewScore(
            isCommentRated,
            id,
            action,
            newComments[parentIndex].replies[index].score,
          );
          newComments[parentIndex].replies[index].score = newScore;
          return [newRatings, newComments];
        }
      }
    }
  }
};

const createComment = (comments, inputData) => {
  // Copy
  const newComments = [...comments];
  // Create new
  const newComment = new UserComment(comments, inputData);
  // Insert at the end
  newComments.push(newComment);

  return newComments;
};

const createReplyForm = (comments, id) => {
  // Go through all comments to find a comment you're replying to
  for (const [index, el] of comments.entries()) {
    if (el.id === id) {
      // Copy up to our id
      const newComments = [...comments];
      newComments[index] = { ...comments[index] };
      newComments[index].replies = [...comments[index].replies];

      // Create new reply
      const replyingTo = el.user.username;
      const newComment = new UserReply(comments, "", replyingTo);
      // Add "newComment" property that will act as an indicator to create a form in place of this comment
      newComment.newComment = true;

      // Insert it at the beginning of the replies
      newComments[index].replies.splice(0, 0, newComment);

      return newComments;
    }

    // Go through all replies
    if (el.replies.length !== 0) {
      const parentEl = el.replies;
      const parentIndex = index;

      for (const [index, el] of parentEl.entries()) {
        if (el.id === id) {
          // Copy
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];

          // Create new
          const replyingTo = el.user.username;
          const newComment = new UserReply(comments, "", replyingTo);
          // Add "newComment" property
          newComment.newComment = true;

          // Insert it immidiately after comment you're replying to in the "replies" array
          newComments[parentIndex].replies.splice(index + 1, 0, newComment);

          return newComments;
        }
      }
    }
  }

  console.log("No such id");
  return comments;
};

const updateComment = (comments, id, inputData) => {
  // Go through all comments to find a comment you're replying to
  for (const [index, el] of comments.entries()) {
    if (el.id === id) {
      // Copy up to our id
      const newComments = [...comments];
      newComments[index] = { ...comments[index] };

      // Delete editing form indicator
      delete newComments[index].editing;
      // Change contents
      newComments[index].content = inputData;

      return newComments;
    }

    // Go through all replies
    if (el.replies.length !== 0) {
      const parentEl = el.replies;
      const parentIndex = index;

      for (const [index, el] of parentEl.entries()) {
        if (el.id === id) {
          // Copy
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          newComments[parentIndex].replies[index] = {
            ...comments[parentIndex].replies[index],
          };

          // Delete editing form indicator
          delete newComments[parentIndex].replies[index].editing;
          // Change contents
          newComments[parentIndex].replies[index].content = inputData;

          return newComments;
        }
      }
    }
  }

  console.log("No such id");
  return comments;
};

const createEditingForm = (comments, id) => {
  // Go through all comments to find a comment you're replying to
  for (const [index, el] of comments.entries()) {
    if (el.id === id) {
      // Copy up to our id
      const newComments = [...comments];
      newComments[index] = { ...comments[index] };

      // Add "editing" property that will act as an indicator to create a form in place of this comment
      newComments[index].editing = true;

      return newComments;
    }

    // Go through all replies
    if (el.replies.length !== 0) {
      const parentEl = el.replies;
      const parentIndex = index;

      for (const [index, el] of parentEl.entries()) {
        if (el.id === id) {
          // Copy
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          newComments[parentIndex].replies[index] = {
            ...comments[parentIndex].replies[index],
          };

          // Add "newComment" property
          newComments[parentIndex].replies[index].editing = true;

          return newComments;
        }
      }
    }
  }

  console.log("No such id");
  return comments;
};

const createReply = (comments, id, inputData) => {
  // Go through all comment's replies (replies can only be in "replies" array)
  for (const [index, el] of comments.entries()) {
    if (el.replies.length !== 0) {
      const parentEl = el.replies;
      const parentIndex = index;

      for (const [index, el] of parentEl.entries()) {
        if (el.id === id && el.newComment) {
          // Copy
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          newComments[parentIndex].replies[index] = {
            ...comments[parentIndex].replies[index],
          };

          // Delete "newComment" property (form indicator) and replace empty content with input
          delete newComments[parentIndex].replies[index].newComment;
          newComments[parentIndex].replies[index].content = inputData;

          return newComments;
        }
      }
    }
  }

  console.log("No such id");
  return comments;
};

const deleteComment = (comments, id) => {
  // Go through all comments
  for (const [index, el] of comments.entries()) {
    if (el.id === id) {
      // Copy up to out id
      const newComments = [...comments];
      newComments[index] = { ...comments[index] };

      // Delete it
      newComments.splice(index, 1);
      return newComments;
    }

    // Go through all replies
    if (el.replies.length !== 0) {
      const parentEl = el.replies;
      const parentIndex = index;

      for (const [index, el] of parentEl.entries()) {
        if (el.id === id) {
          // Copy
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];

          // Delete
          newComments[parentIndex].replies.splice(index, 1);
          return newComments;
        }
      }
    }
  }

  console.log("No such id");
  return comments;
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

          // Copy
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          // Delete
          newComments[parentIndex].replies.splice(index, 1);

          return [newComments, sameId];
        }
      }
    }
  }

  return [comments, sameId];
};

const deleteEditingForm = (comments, id) => {
  let sameId = false;

  for (const [index, el] of comments.entries()) {
    if (el.editing) {
      // Check if this comment is already being edited
      if (el.id === id) {
        sameId = true;
      }

      // copy
      const newComments = [...comments];
      newComments[index] = { ...comments[index] };
      // Delete
      delete newComments[index].editing;

      return [newComments, sameId];
    }
    if (el.replies.length !== 0) {
      const parentEl = el.replies;
      const parentIndex = index;

      for (const [index, el] of parentEl.entries()) {
        if (el.editing) {
          // Check if this comment is already being edited
          if (el.id === id) {
            sameId = true;
          }

          // Copy
          const newComments = [...comments];
          newComments[parentIndex] = { ...comments[parentIndex] };
          newComments[parentIndex].replies = [...comments[parentIndex].replies];
          newComments[parentIndex].replies[index] = {
            ...comments[parentIndex].replies[index],
          };
          // Delete
          delete newComments[parentIndex].replies[index].editing;

          return [newComments, sameId];
        }
      }
    }
  }

  return [comments, sameId];
};

export default changeCommentScore;
export {
  deleteReplyForm,
  deleteEditingForm,
  deleteComment,
  createComment,
  createReplyForm,
  createEditingForm,
  createReply,
  updateComment,
};
