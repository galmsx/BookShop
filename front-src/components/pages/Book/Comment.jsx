import React from "react";

function Comment({ login, id, del, text ,time }) {
  console.log(time);
  return (
    <div className="comment">
      <h6>
        <i class="fas fa-user" />   
        {login}
      </h6>
      <p>{text}</p>
      {del ? (
        <div className="del" onClick={() => del(id)}>
          <i class="fas fa-times" />
        </div>
      ) : (
        ""
      )}
      <div className="time">{time.slice(0,-14)}</div>
    </div>
  );
}
export default Comment;
