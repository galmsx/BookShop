import React from "react";
import { Link } from "react-router-dom";
function MoneyButton({ money }) {
  return (
    <div className="money-button">
    <span>Now you have  </span>
    <strong>{money + "$"}</strong>
      <Link className="but-to-money" to="/profile/money">
        more
      </Link>
    </div>
  );
}

export default MoneyButton;
