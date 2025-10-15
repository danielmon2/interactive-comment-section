import ResponsiveTextarea from "../EditingTextarea";
import "./NewComment.css";

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
    <form onSubmit={handleFormSubmit} className="comment">
      <img className="comment--new__avatar" src={image.png}></img>
      <ResponsiveTextarea
        defaultValue={""}
        autoFocus={isReplying}
        name={"newCommentTextarea"}
        placeholder={"Add a comment..."}
        className={"comment--new__textarea"}
        minTextareaHeight={80}
      />
      <button type="submit" className="btn comment__btn btn--send">
        SEND
      </button>
    </form>
  );
};

export default NewComment;
