import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MultiButton({ BookId, purchased, title }) {
  var [status, setStatus] = useState(purchased ? 3 : 1); //3-purchased,2- inBasket , 1 - !2

  useEffect(() => {
    if (purchased) setStatus(3);
    else if (inBasket()) setStatus(2);
    else {
      setStatus(1);
    }
  });

  function putInBasket() {
    if (inBasket()) return;
    var basket = localStorage.getItem("basket") || '{"books" : []}';
    basket = JSON.parse(basket);
    basket.books.push(BookId);
    localStorage.setItem("basket", JSON.stringify(basket));
    setStatus(2);
  }

  function inBasket() {
    var basket = localStorage.getItem("basket") || '{"books" : []}';
    basket = JSON.parse(basket);
    return basket.books.includes(BookId);
  }
  function Download() {
    fetch(`/api/loadbook?id=${BookId}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.blob();
      })
      .then(file => {
        var link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = `${title}.fb2`;
        link.click();
      })
      .catch(err => console.log(err));
  }

  return status == 1 ? (
    <div className="button" onClick={putInBasket}>
      <i class="fas fa-cart-plus" /> Put in Basket
    </div>
  ) : status == 2 ? (
    <Link className="button" to="/profile">
      <i class="fas fa-money-check-alt" /> Go to basket
    </Link>
  ) : (
    <div className="button" onClick={Download}>
      <i class="fas fa-file-download" /> Download
    </div>
  ); //сделать кнопку для загрузки
}

export default MultiButton;
