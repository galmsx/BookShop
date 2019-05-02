import React from "react";
import Item from "./item";

class Authors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      itemName: "",
      filter: "",
      unique: true
    };
    this.getItems();
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getItems = this.getItems.bind(this);
  }
  addItem(ev) {
    ev.preventDefault();
    fetch(`/api/addauthor?name=${this.state.itemName}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) throw Error(res.status);
        this.getItems();
      })
      .catch(err => {
        if (err.message == 501) this.setState({ unique: false });
        else console.log(err);
      });
  }
  getItems() {
    var filter = this.state.filter;
    fetch(`/api/authors?filter=${filter}`)
      .then(res => {
        if (!res.ok) throw new Error(res.text);
        return res.json();
      })
      .then(res => this.setState({ authors: res, itemName: "", unique: true }))
      .catch(err => console.log(err));
  }
  deleteItem(id) {
    fetch(`/api/delauthor?id=${id}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        this.getItems();
      })
      .catch(err => console.log(err));
  }
  render() {
    let authors = this.state.authors;
    return (
      <div>
        <div className="items-wrapper">
          {authors.map(el => {
            return <Item id={el.id} name={el.name} del={this.deleteItem} />;
          })}
        </div>
        <div className="add-item-wrapper">
          <form onSubmit={this.addItem}>
            {this.state.unique ? "" : <span>Must be unique</span>}
            <br />
            <input
              type="text"
              value={this.state.itemName}
              onChange={ev => this.setState({ itemName: ev.target.value })}
              required
            />
            <br />
            <input type="submit" value="Add author" />
          </form>

          <form
            onSubmit={ev => {
              ev.preventDefault();
              this.getItems();
            }}
          >
            <input
              type="text"
              value={this.state.filter}
              onChange={ev => this.setState({ filter: ev.target.value })}
            />
            <br />
            <input type="submit" value="Filter" />
          </form>
        </div>
      </div>
    );
  }
}
export default Authors;
