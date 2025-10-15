const NewComment = ({ image, createNewComment }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (data.newCommentInput !== "") {
      createNewComment(data.newCommentInput);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="comment-base new-comment">
      <img className="new-comment-avatar" src={image.png}></img>
      <input
        name="newCommentInput"
        className="new-comment-input"
        type="text"
        placeholder="Add a comment..."
      />
      <button type="submit" className="btn-base send-btn">
        SEND
      </button>
    </form>
  );
};

export default NewComment;
