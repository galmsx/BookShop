import React, { useRef } from "react";

function AddComment({ signed, onCreate }) {
  var text = useRef(null);
  var onSubmit = e => {
    e.preventDefault();
    onCreate(text.current.value);
    text.current.value = "";
  };
  if (!signed) return <div className="addcomment"> Sign in for comment!</div>;
  return (
    <form className="addcomment" onSubmit={onSubmit}>
      <textarea name="" id="" maxlength="255" ref={text} />
      <input type="submit" value="Comment" />
    </form>
  );
}

export default AddComment;
