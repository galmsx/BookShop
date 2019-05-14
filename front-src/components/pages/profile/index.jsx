import React from "react";
import Auth from "./Auth";
import SignOut from "./SignOut";
import Head from "./head";
import { Route } from "react-router-dom";
import Authors from "./admin/Authors";
import Genres from "./admin/Genres";
import Books from './admin/Books';
import base64url from "base64url";
import Basket from './user/basket';
import Money from './user/money';
import Purchases from './user/purchases'

function Profile(props) {
  var signed = localStorage.getItem("token");
  var admin = false;
  if (signed) {
    signed = JSON.parse(base64url.decode(signed.split(".")[1]));
    admin = signed.isAdmin;
  }

  var login = signed ? SignOut : Auth;
  var path = props.match.path;
  var main = admin ? Books : Basket;

  return (
    <main>
      <Head match={props.match} admin={admin} signed = {signed} />

      <Route path={path} component={main} exact />
      <Route path={path + "/login"} component={login} />
      <Route path={path + "/authors"} component={Authors} />
      <Route path={path + "/genres"} component={Genres} />
      <Route path={path + "/money"} component={Money} />
      <Route path={path + "/purchases"} component={Purchases} />

    </main>
  );
}

export default Profile;
