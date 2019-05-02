import React from "react";

function Option({ id, title, checked, onClick, type }) {
  return (
    <div
      className={"option-item" + (checked ? " item-checked" : "")}
      onClick={() => onClick(id, type)}
    >
      {title}
    </div>
  );
}
export default Option;
