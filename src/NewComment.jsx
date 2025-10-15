const NewComment = (props) => {
  return (
    <div className="new-comment">
      <img src={props.image.png}></img>
      <input type="text" placeholder="Add a comment..." />
      <button>Send</button>
    </div>
  );
};

export default NewComment;
