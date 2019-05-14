import React from "react";
import { NavLink } from "react-router-dom";

function Head(props) {
  var path = props.match.path;

  if (props.admin) {
    return (
      <nav className="profile-nav">
        <NavLink to={path} activeClassName="prof-act" exact>
          <div>Books</div>
        </NavLink>
        <NavLink to={path + "/authors"} activeClassName="prof-act">
          <div>Authors</div>
        </NavLink>
        <NavLink to={path + "/genres"} activeClassName="prof-act">
          <div>Genres</div>
        </NavLink>

        <NavLink to={path + "/login"} activeClassName="prof-act">
          <div>Login</div>
        </NavLink>
      </nav>
    );
  } else
    return (
      <nav className="profile-nav">
        <NavLink to={path} activeClassName="prof-act" exact>
          <div>Bascket</div>
        </NavLink>

        {props.signed ? (
          <>
            <NavLink to={path + "/purchases"} activeClassName="prof-act">
              <div>Purchases</div>
            </NavLink>

            <NavLink to={path + "/money"} activeClassName="prof-act">
              <div>Money</div>
            </NavLink>
          </>
        ) : (
          ""
        )}

        <NavLink to={path + "/login"} activeClassName="prof-act">
          <div>Login</div>
        </NavLink>
      </nav>
    );
}
export default Head;
