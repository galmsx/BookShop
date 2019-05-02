import React from "react";
import ReactDOM from "react-dom";
import Head from "./components/Head";
import { HashRouter as Router, Route } from "react-router-dom";
import Main from "./components/pages/Main";
import Profile from "./components/pages/profile";
import Search from "./components/pages/Search";
import Book from './components/pages/Book';
import GetBook from './components/pages/GetBook';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Head />
        <Route path="/" component={Main} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/book/:id" component={Book} />
        <Route path="/getbook/:id" component={GetBook} />
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
module.hot.accept();
