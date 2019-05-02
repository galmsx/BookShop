import React from "react";

function Paging({ pageChange }) {
  return (
    <div className="pages">
      <i
        className="fas fa-angle-double-left"
        onClick={() => pageChange(-1)}
      />
      <i
        className="fas fa-angle-double-right"
        onClick={() => pageChange(1)}
      />
    </div>
  );
}
export default Paging;
