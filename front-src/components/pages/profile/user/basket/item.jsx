import React from "react";
import { Link } from "react-router-dom";

function buyBook(id, price, money, onDel) {
  if (+price > +money) {
    document.location.href = "/#/profile/money";
  } else if (!localStorage.getItem("token")) {
    document.location.href = "/#/profile/login";
  } else {
    fetch(`/api/user/buybook?id=${id}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (res.ok) onDel(id);
        else throw Error(res.statusText);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function Item({ title, cover, id, price, money, onDel }) {
  return (
    <div className="book-item">
      <img src={cover} alt="image" />
      <div className="options">
        <div>
          <strong>Title:</strong>
          <br />
          <span>{title}</span>
        </div>
        <div>
          <strong>Price: </strong>
          <span>{price + "$"}</span>
        </div>

        <div
          className="button"
          onClick={() => buyBook(id, price, money, onDel)}
        >
          Buy
        </div>

        <Link to={`/book/${id}`}>
          <div className="button">showMore</div>
        </Link>
      </div>

      <div className="delete-item" onClick={() => onDel(id)}>
        <i class="fas fa-times" />
      </div>
    </div>
  );
}
export default Item;
