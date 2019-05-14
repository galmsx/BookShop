import React from "react";
import Item from "./item";

function List({ books , money , onDel }) {
  return (
    <div className="books-item-list">
      {books.map(e => (
         <Item id={e.id} title={e.title} cover={e.cover} price={e.price} money={money} onDel={onDel}/>
      ))}
    </div>
  );
}
export default List;
