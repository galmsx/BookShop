import React from "react";
import { Link } from "react-router-dom";
import MarkBar from "./MarkBar";

function BookCard({ id, title, cover, authors,genres, price, desc, mark, editor }) {
  return (
    <div className="card">
    {mark ? <MarkBar mark={mark}/> : ""}
      <img src={cover || "/covers/none.png"} alt="cover"  />
      <div className="card-info">
        <div className="prname">
          <h3>{title}</h3>
          <span>${price}</span>
        </div>
        <h4> Author: {authors.join(',')}</h4>
        {!genres ||<h4>Genre: {genres.join(" , ")} </h4>}
        <div className="desc">
          <p>{desc}</p>
        </div>
        {editor ? (
          <div className="editor">
            <div onClick={()=>editor(id,"edit")}> Edit</div>
            <div onClick={()=>editor(id,"delete")}>Delete</div>
          </div>
        ) : (
          <Link to={`/book/${id}`}>
            <div className="button">
              <span>Show More</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default BookCard;
