import React from "react";

function Submit(onEnter) {
  onEnter({
    field: document.getElementById("SearchField").value,
    genre: document.getElementById("dropDownSearchHead").value
  });
}

function SearchHead({ onEnter, genres }) {

  return (
    <form
      className="search-head"
      onSubmit={e => {
        e.preventDefault();
        Submit(onEnter);
      }}
    >
      <input id="SearchField" type="text" placeholder="Enter something" />
      <select id="dropDownSearchHead" onChange={() => Submit(onEnter)}>
        <option value="all"> All genres </option>
        {genres.map(e => (
          <option value={e.title}>{e.title}</option>
        ))}
      </select>
    </form>
  );
}
export default SearchHead;
