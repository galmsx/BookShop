import React from "react";

class Money extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 0
    };
    this.send = this.send.bind(this);
  }
  send(e) {
    e.preventDefault();
    var data = new FormData();
    data.append("amount", document.getElementById("money").value);
    fetch("/api/user/money", {
      headers: new Headers({ authorization: localStorage.getItem("token") }),
      method: "POST",
      body: data
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        else {
          this.componentDidMount();
          document.getElementById("money").value = 0;
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <div className="money-button">
          <span>Now you have </span>
          <strong>{this.state.money + "$"}</strong>
        </div>
        <form className="money-form" onSubmit={this.send}>
          <input
            type="number"
            id="money"
            min="1"
            className="money-form-money"
          />
          <input type="submit" className="money-form-submit" />
        </form>
      </>
    );
  }
  componentDidMount() {
    fetch("/api/user/money", {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(res => {
        this.setState(res);
      })
      .catch(err => console.log(err));
  }
}
export default Money;
