import React from "react";
import MoneyButton from "./MoneyButton";
import List from "./list";

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.signed = localStorage.getItem("token");
    this.state = {
      money: 0,
      books: []
    };
    this.onDel = this.onDel.bind(this);
  }
  Basket() {
    var basket = localStorage.getItem("basket") || '{"books" : []}';
    basket = JSON.parse(basket);
    return basket;
  }
  onDel(id) {
    var basket = this.Basket();
    basket.books.splice(basket.books.indexOf(id),1);
    localStorage.setItem("basket",JSON.stringify(basket));
    this.componentDidMount();
  }

  componentDidMount() {
    fetch(`/api/user/basket?id=${this.Basket().books}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(res => {
        this.setState({ books: res });
        return fetch("/api/user/money", {
          headers: new Headers({ authorization: localStorage.getItem("token") })
        });
      })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(res => {
        this.setState({ money: res.money });
      })
      .catch(res => console.log(res));
  }

  render() {
    return (
      <div>
        {this.signed ?<MoneyButton money={this.state.money} /> : ""}

        <List books={this.state.books} onDel={this.onDel} money={this.state.money} />
      </div>
    );
  }
}
export default Basket;
