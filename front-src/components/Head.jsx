import React from "react";
import { Link, NavLink } from "react-router-dom";
import base64url from "base64url";

function Head(props) {
  var signed = localStorage.getItem("token");
  var login = "Profile";
  if (signed) {
    signed = JSON.parse(base64url.decode(signed.split(".")[1]));
    login = signed.login;
  }
  return (
    <header>
      <Link to={"/"}>
        <i className="fas fa-book-open" />
        <strong> BookStore</strong>
      </Link>
      <nav>
        <NavLink to={"/"} activeClassName="navs-act" className="navs-l" exact>
          <div className="navs">
            <span>main</span>
          </div>
        </NavLink>
        <NavLink to={"/new"} activeClassName="navs-act" className="navs-l">
          <div className="navs">
            <span>new</span>
          </div>
        </NavLink>
        <NavLink to={"/search"} activeClassName="navs-act" className="navs-l">
          <div className="navs">
            <span>search</span>
          </div>
        </NavLink>
        <NavLink to={"/about"} activeClassName="navs-act" className="navs-l">
          <div className="navs">
            <span>about</span>
          </div>
        </NavLink>
      </nav>
      <Link to={"/profile"}>
        <i className="fas fa-shopping-basket" />
        <span> {login}</span>
      </Link>
    </header>
  );
}
export default Head;
