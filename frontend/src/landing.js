import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./styles/landing.scss";
class Landing extends Component {
  state = {
    referrer: ""
  };

  handleClick = e => {
    if (e.target.id === "student") {
      this.setState({ referrer: "student" });
    } else if (e.target.id === "owner") {
      this.setState({ referrer: "owner" });
    } else if (e.target.id === "npo") {
      this.setState({ referrer: "npo" });
    }
  };
  render() {
    const { referrer } = this.state;
    if (referrer === "student")
      return (
        <Redirect
          to={{
            pathname: "/StudentLogin",
            state: { type: "Student" }
          }}
        />
      );

    if (referrer === "owner") return <Redirect to="/OwnerLogin" />;

    if (referrer === "npo") return <Redirect to="/NPOLogin" />;

    return (
      <div className="landing">
        <div>
          <button id="student" onClick={this.handleClick}>
            Student
          </button>
          <button id="owner" onClick={this.handleClick}>
            Owner
          </button>
          <button id="npo" onClick={this.handleClick}>
            Non-Profit
          </button>
        </div>
      </div>
    );
  }
}

export default Landing;
