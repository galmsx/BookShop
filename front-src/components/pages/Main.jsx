import React from "react";
import BookList from '../navs/BookList';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
    this.curentPage = 1;
    this.getCards = this.getCards.bind(this);
    this.getCards();
  }

  getCards(page) {
    if (page > 0) page = this.curentPage + 1;
    else if (page < 0) page = this.curentPage - 1;
    else page = this.curentPage;
    if (page == 0) return;
    fetch(`/api/booklist/?page=${page}`, { method: "GET" })
      .then(res => {
        if (!res.ok) throw Error(res.status + " - " + res.statusText);
        return res.json();
      })
      .then(res => {
        if (!res.length) return;
        if (res[0] == -1) res = [];
        this.setState({ bookList: res},()=>this.curentPage = page);
      })
      .catch(err => console.log(err));
  }

  render() {
    var books = this.state.bookList;
    return (
      <main>
        <div className="caption">
          <h1>Greatest book store with best design!</h1>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
            pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
            Donec.{" "}
          </p>
          <span>Our books:</span>
        </div>
        <BookList books = {books} pageChange = {this.getCards}/>



      </main>
    );
  }
}
export default Main;
