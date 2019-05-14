import React from "react";
import { Link } from "react-router-dom";

function Purchase({
  id,
  title,
  cost,
  cover,
  createdAt,
  mark,
  onSetRate
}) {
  return (
    <div className="purchase">
      <img src={cover} alt="" />
      <div className="p-inf">
        <h1>Title: {title}</h1>
        <h1>Cost : {cost}</h1>
        <h1>Purchased At: {createdAt.slice(0, -14)}</h1>
        <div className="button-section">
          <Link to={`/book/${id}`} className="purch-button">
            Show
          </Link>
          {mark ? (
            <div className="purch-button rate">Mark: {mark}</div>
          ) : (
            <form className="purch-button" onSubmit={e =>{
                e.preventDefault();
                let mark = document.getElementById('mark').value;
                onSetRate(id,+ mark);
            }}>
              <input type="number" id="mark" min="1" max="10" required/>
              <input type="submit" value="rate" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Purchase;
