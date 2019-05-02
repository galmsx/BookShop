import React from "react";
import sha256 from "sha256";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      login: "",
      pass: "",
      warning: ""
    };
    this.changeHandle = this.changeHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.register = this.register.bind(this);
  }

  changeHandle(ev) {
    if (ev.target.id == "log") {
      this.setState({ login: ev.target.value });
    } else {
      this.setState({ pass: ev.target.value });
    }
  }
  submitHandle(ev) {
    ev.preventDefault();
    if (this.state.isLogin) this.login();
    else this.register();
  }
  login() {
    const login = this.state.login;
    const pass = sha256(this.state.pass);
    fetch(`/api/login/?login=${login}&password=${pass}`)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then(res => {
        localStorage.setItem("token", res);
        location.reload();
      })
      .catch(err => {
        if (err.message == 400)
          this.setState({ warning: "incorrect login or password" });
        else console.log(err);
      });
  }

  register() {
    const login = this.state.login;
    const pass = sha256(this.state.pass);
    fetch(`/api/register/?login=${login}&password=${pass}`)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then(res => {
        localStorage.setItem("token", res);
        location.reload();
      })
      .catch(err => {
        if (err.message == 501) {
          this.setState({ warning: "login must be unique" });
        } else console.log(err);
      });
  }

  render() {
    let pass = this.state.pass;
    let login = this.state.login;
    let isLogin = this.state.isLogin;
    let warning = this.state.warning;

    return (
      <div className="wrap-auth">
        <div className="wrap-auth-form">
          <div>
            <div
              className={isLogin ? "register" : "register l-active"}
              onClick={() => this.setState({ isLogin: false })}
            >
              <span>Register</span>
            </div>
            <div
              className={isLogin ? "login l-active " : "login"}
              onClick={() => this.setState({ isLogin: true })}
            >
              <span>Login</span>
            </div>
          </div>

          <form onSubmit={this.submitHandle}>
            <div>
              <label htmlFor="log"> Login:</label>
              <h5>{warning}</h5>
              <input
                type="text"
                id="log"
                value={login}
                onChange={this.changeHandle}
                pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"
                required
              />
              <h6>2-20 characters or numbers.</h6>
            </div>
            <div>
              <label htmlFor="pass"> Password:</label>
              <input
                type="password"
                id="pass"
                value={pass}
                onChange={this.changeHandle}
                required
                pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$"
              />
              <h6>4-20 characters or numbers.</h6>
            </div>
            <input type="submit" value={isLogin ? "Sign IN" : "Sign UP"} />
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
