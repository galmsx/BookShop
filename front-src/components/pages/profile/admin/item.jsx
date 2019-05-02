import React from "react";

function Item({ id, name, del }) {
  return (
    <div className="item">
      <span>{name}</span>
      <i class="fas fa-trash-alt" onClick={() => del(id)} />
    </div>
  );
}
export default Item;
