const NewComment = ({ id, image, createNewComment, isReplying }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (data.newCommentInput !== "") {
      createNewComment(data.newCommentInput, id);
      event.target.reset();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="comment-base new-comment">
      <img className="new-comment-avatar" src={image.png}></img>
      <input
        autoFocus={isReplying}
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
