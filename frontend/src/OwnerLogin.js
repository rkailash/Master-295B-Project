import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./styles/login.scss";
class StudentLogin extends Component {
  state = {};
  render() {
    return (
      <div className="login">
        <p>
          Need an account?{" "}
          <Link
            to={{
              pathname: "/Register",
              state: {
                ref: "owner"
              }
            }}
            onClick={this.handleSignUp}
          >
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
              onChange={this.handleChange}
              onFocus={() => this.setState({ showEmailError: false })}
              id="Popover1"
            />
          </div>
          <input
            tabIndex={2}
            type="password"
            name="password"
            placeholder="Password"
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
        </form>
      </div>
    );
  }
}

export default StudentLogin;
