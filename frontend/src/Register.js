import React, { Component } from "react";
import Header from "./Header";
import "./styles/login.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  state = {
    showError: false,
    signUpFormIsOpen: false,
    loginForm: false,
    registerSuccess: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: ""
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({ loginForm: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Inside handle submit method");
    const { firstName, lastName, email, password, type } = this.state;
    const data = {
      firstName,
      lastName,
      email,
      password,
      type
    };
    console.log("Axios data :", data);
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/Register", data)
      .then(response => {
        console.log(response);
        // if (response.status === 200) {
        //   console.log(response);
        //   this.setState({ registerSuccess: true });
        // } else if (response.status === 400) {
        //   // console.log("inside error!");
        //   // this.setState({ registerSuccess: false, showError: true });
        //   // console.log(response);
        //   // console.log("show error ", this.state.showError);
        // }
      })
      .catch(error => {
        this.setState({
          showError: true,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          type: ""
        });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { firstName, lastName, email, password, type } = this.state;
    return (
      <div>
        {this.state.showError && (
          <div className="error-message">
            Oops! This email address already exists. Please login
          </div>
        )}
        <div className="register">
          <p>
            Already have an account?&nbsp;
            <Link to="/Login">Login</Link>
          </p>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <input
                autoFocus
                tabIndex={1}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={this.handleChange}
              />
              <input
                tabIndex={2}
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={this.handleChange}
              />
              <input
                tabIndex={3}
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={this.handleChange}
              />
              <input
                tabIndex={4}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              <select
                placeholder="type"
                name="type"
                value={type}
                onChange={this.handleChange}
              >
                <option value=""></option>
                <option value="Student">Student</option>
                <option value="Owner">Owner</option>
                <option value="NPO">Non-Profit</option>
              </select>
              <button
                tabIndex={1}
                autoFocus
                type="button"
                className="btn-register"
                name="register"
                onClick={this.handleSubmit}
              >
                Sign Me Up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
