import React, { Component } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import "./styles/login.scss";
import Header from "./Header";
import axios from "axios";
class Login extends Component {
  state = {
    account: { email: "", password: "" },
    authFlag: false,
    signUpFlag: false,
    showEmailError: false,
    showLoginError: true
  };
  validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  handleSignUp = e => {
    e.preventDefault();
    this.setState({ signUpFlag: true });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("Inside handlesubmit method");

    const data = { ...this.state.account };

    if (this.validateEmail(data.email)) {
      // axios.defaults.withCredentials = true;
      console.log(data);
      axios.post("http://54.226.124.3:3001/Login", data).then(response => {
        console.log("Axios POST response:", response.status);

        if (response.status === 200) {
          this.setState({ authFlag: true });
          // this.props.setUserInfo(response.data);
          console.log("Login successful!");
        } else {
          console.log("Login unsuccessful!");
          this.setState({ authFlag: false, showLoginError: true });
        }
      });
    } else {
      this.setState({ showEmailError: true });
    }
  };
  render() {
    const { account, userInfo, showEmailError } = this.state;
    if (this.state.signUpFlag) return <Redirect to="/Register" />;
    if (this.state.authFlag) return <Redirect to="/Home" />;
    return (
      <div className="login">
        <Header />
        <h2></h2>
        <p>
          Need an account?{" "}
          <Link to="/Register" onClick={this.handleSignUp}>
            Sign Up
          </Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <h3>Owner Login</h3>
          <div>
            <input
              autoFocus
              tabIndex={1}
              type="email"
              name="email"
              placeholder="Email address"
              value={account.email}
              onChange={this.handleChange}
              onFocus={() => this.setState({ showEmailError: false })}
              id="Popover1"
            />
            <Popover
              placement="right"
              isOpen={this.state.showEmailError}
              target="Popover1"
            >
              <PopoverHeader>Error</PopoverHeader>
              <PopoverBody>Invalid email address.</PopoverBody>
            </Popover>
          </div>
          <input
            tabIndex={2}
            type="password"
            name="password"
            placeholder="Password"
            value={account.password}
            onChange={this.handleChange}
          />
          <button
            tabIndex={3}
            type="button"
            className="btn-login"
            name="login"
            onClick={this.handleSubmit}
          >
            Log in
          </button>
          {this.state.showLoginError && <small className="my-error"></small>}
        </form>
      </div>
    );
  }
}

export default Login;
