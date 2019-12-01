import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "./styles/login.scss";
import axios from "axios";
class Login extends Component {
  state = {
    email: "",
    password: "",
    studentLogin: false,
    ownerLogin: false,
    NPOLogin: false,
    signUpFlag: false,
    showEmailError: false,
    showBlankPwdError: false
  };

  validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("State", this.state);
    const data = { email: this.state.email, password: this.state.password };

    console.log("Password", data.password);
    if (!this.validateEmail(data.email)) {
      this.setState({ showEmailError: true });
    } else if (data.password === "") {
      this.setState({ showBlankPwdError: true });
    } else {
      axios
        .post("http://localhost:3001/Login", data)
        .then(response => {
          console.log("Axios POST response:", response);
          this.props.setUserInfo(response.data.firstname);
          if (response.data.type === "Student") {
            this.setState({ studentLogin: true });
            console.log("Student page!", this.state.studentLogin);
          }

          if (response.data.type === "Owner") {
            this.setState({ ownerLogin: true });
          }

          if (response.data.type === "NPO") {
            this.setState({ NPOLogin: true });
          }
        })
        .catch();
    }
  };

  handleChange = e => {
    console.log("Name:", [e.target.name], "Value:", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUp = e => {
    e.preventDefault();
    this.setState({ signUpFlag: true });
  };
  render() {
    if (this.state.signUpFlag) return <Redirect to="/Register" />;
    if (this.state.studentLogin) {
      return <Redirect to="/Home" />;
    }

    if (this.state.ownerLogin) {
      return <Redirect to="/OwnerPost" />;
    }

    if (this.state.NPOLogin) {
      return <Redirect to="/NPOPost" />;
    }
    return (
      <div className="login">
        <p>
          Need an account?{" "}
          <Link to="/Register" onClick={this.handleSignUp}>
            Sign Up
          </Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <div>
            <input
              autoFocus
              tabIndex={1}
              type="email"
              name="email"
              placeholder="Email address"
              value={this.state.email}
              onChange={this.handleChange}
              onFocus={() => this.setState({ showEmailError: false })}
              id="Popover1"
            />

            <Popover
              placement="right"
              isOpen={this.state.showEmailError}
              target="Popover1"
              className="error"
            >
              <PopoverHeader>Error</PopoverHeader>
              <PopoverBody>Invalid email address.</PopoverBody>
            </Popover>
          </div>
          <div>
            <input
              tabIndex={2}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              id="Popover2"
              onFocus={() => this.setState({ showBlankPwdError: false })}
            />
            <Popover
              placement="right"
              isOpen={this.state.showBlankPwdError}
              target="Popover2"
              className="error"
            >
              <PopoverHeader>Error</PopoverHeader>
              <PopoverBody>Password can't be empty</PopoverBody>
            </Popover>
          </div>

          <button
            tabIndex={3}
            type="button"
            className="btn-login"
            name="login"
            onClick={this.handleSubmit}
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
