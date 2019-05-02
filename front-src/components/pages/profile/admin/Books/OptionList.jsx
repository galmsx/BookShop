import React from "react";
import Option from "./Option";
function optionList({ title, options, checked, onCheck, onFilter }) {
  return (
    <div className="option-list">
      <form
        onSubmit={ev => {
          ev.preventDefault();
          onFilter(title, document.getElementById(title).value);
        }}
      >
        <input id={title} type="text" name={title} />
        <input type="submit" value="filter" />
      </form>
      <h6>{title}:</h6>
      <div className="options">
        {options.map(el => {
          return (
            <Option
              id={el.id}
              title={el.title}
              checked={checked.has(el.id)}
              onClick={onCheck}
              type={title}
            />
          );
        })}
      </div>
    </div>
  );
}
export default optionList;
