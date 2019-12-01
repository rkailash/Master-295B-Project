import React, { Component } from "react";
import "./styles/ownerPost.scss";
import { Select } from "grommet";
import Modal from "./Modal";
import Header from "./Header";
class NPOPost extends Component {
  state = {
    desc: "",
    zipcode: "",
    hours: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { desc, zipcode, hours } = this.state;
    return (
      <div className="property-form">
        <div className="owner-post">
          <Header title={"Post community service hours"} />
          <form className="k-form">
            <div className="column">
              <textarea
                name="desc"
                placeholder="Description"
                tabIndex={1}
                value={desc}
                id="desc"
                onChange={this.handleChange}
              ></textarea>
              <input
                name="zipcode"
                placeholder="ZipCode"
                tabIndex={3}
                value={zipcode}
                id="zipcode"
                onChange={this.handleChange}
              />
              <select
                placeholder="Hours"
                id="hours"
                value={hours}
                onChange={this.handleChange}
              >
                <option value=""></option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              {/* <input
                name="Community Hours"
                placeholder="Hours"
                tabIndex={3}
                value={hours}
                id="hours"
                onChange={this.handleChange}
              /> */}
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NPOPost;
