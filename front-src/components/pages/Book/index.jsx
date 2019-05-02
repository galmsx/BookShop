import React from "react";
import base64url from "base64url";
import BookInf from "./BookInf";
import Comments from "./CommentList";
import AddComment from "./AddComment";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.currentUserId = null;
    this.state = {
      Authors: [],
      Comments: [],
      Genres: [],
      descr: "",
      cover: "",
      id: 0,
      pages: 0,
      price: 0,
      title: "",
      purchased: false
    };
    this.onDelComment = this.onDelComment.bind(this);
    this.onCreateComment = this.onCreateComment.bind(this);
  }
  componentDidMount() {
    fetch(`/api/getbook?id=${this.id}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(res => {
        this.setState(res);
      })
      .catch(err => console.log(err));
  }
  onDelComment(id) {
    fetch(`/api/delcomment?id=${id}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        this.componentDidMount();
      })
      .catch(err => console.log(err));
  }
  onCreateComment(text) {
    var data = new FormData();
    data.append("text", text);
    data.append("BookId", this.state.id);
    data.append("UserId", this.currentUserId);
    fetch("/api/addcomment", {
      headers: new Headers({ authorization: localStorage.getItem("token") }),
      method: "POST",
      body: data
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        this.componentDidMount();
      })
      .catch(err => console.log(err));
  }
  render() {
    var signed = localStorage.getItem("token");
    if (signed) {
      signed = JSON.parse(base64url.decode(signed.split(".")[1]));
      this.currentUserId = signed.id;
    }

    return (
      <main>
        <BookInf book={this.state} />
        <AddComment signed={signed} onCreate={this.onCreateComment} />
        <Comments
          comments={this.state.Comments.reverse()}
          onDel={this.onDelComment}
          userId={this.currentUserId}
        />
      </main>
    );
  }
}

export default Book;
