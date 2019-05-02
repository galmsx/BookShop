import React from "react";
import Comment from "./Comment";


function Comments({ userId, comments , onDel}) {
  

  return (
    <>
      {comments.map(e => (
        <Comment
          login={e.UserLogin}
          id={e.id}
          text={e.text}
          del={e.UserId == userId ? onDel : false}
          time={e.createdAt}
        />
      ))}
    </>
  );
}
export default Comments;
