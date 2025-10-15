const NewComment = (props) => {
  return (
    <div className="comment-base new-comment">
      <img className="avatar" src={props.image.png}></img>
      <input
        className="new-comment-input"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="btn-base send-btn">SEND</button>
    </div>
  );
};

export default NewComment;
