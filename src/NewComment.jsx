import ResponsiveTextarea from "./EditingTextarea";

const NewComment = ({ id, image, createNewComment, isReplying }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (data.newCommentTextarea !== "") {
      createNewComment(data.newCommentTextarea, id);
      event.target.reset();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="comment-base new-comment">
      <img className="new-comment-avatar" src={image.png}></img>
      <ResponsiveTextarea
        defaultValue={""}
        autoFocus={isReplying}
        name={"newCommentTextarea"}
        placeholder={"Add a comment..."}
        className={"new-comment-textarea"}
        minTextareaHeight={80}
      />
      <button type="submit" className="btn-base send-btn">
        SEND
      </button>
    </form>
  );
};

export default NewComment;
