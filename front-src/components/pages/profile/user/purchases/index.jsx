import React from "react";
import Purchase from "./Purchase";

class Purchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.onSetRate =this.onSetRate.bind(this);
  }
  render() {
    return (
      <>
        {this.state.books.map(e => (
          <Purchase
            id={e.id}
            cost={e.Purchases[0].cost}
            title={e.title}
            cover ={e.cover}
            createdAt = {e.Purchases[0].createdAt}
            mark = {e.Purchases[0].mark}
            key = {e.id}
            onSetRate={this.onSetRate}
          />
        ))}
      </>
    );
  }
  onSetRate(id,mark){
      fetch(`/api/user/setrate?book=${id}&mark=${mark}`,{
        headers: new Headers({ authorization: localStorage.getItem("token") })
      })
      .then(res=>{
          if(res.ok) this.componentDidMount();
          else throw Error(res.statusText);
      })
      .catch(err=>{
          console.log(err);
      })
      
  }
  componentDidMount() {
    fetch("/api/user/purchases", {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(res => {
        this.setState({ books: res });
      })
      .catch(err => console.log(err));
  }
}
export default Purchases;
