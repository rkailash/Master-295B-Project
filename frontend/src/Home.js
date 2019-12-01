import React, { Component } from "react";
import axios from "axios";
import Search from "./Search";
// import RecentActivity from "./RecentActivity";
import Header from "./Header";
import "./styles/home.scss";
import { Redirect } from "react-router-dom";
import { userInfo } from "os";
import moment from "moment";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToListing: false,
      items: []
    };
  }
  onClickSearch = query => {
    let locArr = [];
    locArr = query.location.split(",");
    let address = locArr[0];
    let zipcode = locArr[1].match();
    console.log("Query:", query);
    let data = { address: locArr[0], zipcode: locArr[1] };
    console.log("Data:", data);
    const startDate = moment(query.startDate).format("YYYY-MM-DD");
    const endDate = moment(query.startDate).format("YYYY-MM-DD");
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3001/PropertyList`, {
        params: {
          address: data.address,
          zipcode: data.zipcode
        }
      })
      .then(response => {
        console.log("Axios POST response:", response.status);
        if (response.status === 200) {
          this.setState({ goToListing: true, items: response.data });
        } else {
          console.log(response);
        }
      });
    // axios
    //   .get(`http://localhost:3001/PropertyList`, {
    //     params: { string }
    //   })
    //   .then(response => {
    //     console.log("Axios POST response:", response.status);
    //     if (response.status === 200) {
    //       console.log("response:", response.data);
    //       this.setState({ goToListing: true, items: response.data });
    //       // this.setState({ goToListing: true, items: response.data });
    //       console.log(response.data);
    //     } else {
    //       console.log(response);
    //     }
    //   });
    // this.props.saveSearchQuery(query);
  };
  render() {
    // const { items, query } = this.state;
    const { items } = this.state;
    if (this.state.goToListing) {
      return (
        <Redirect
          to={{
            pathname: "/Listing",
            state: {
              referrer: {
                items
              }
            }
          }}
        />
      );
    }
    // if (this.state.goToListing) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/Listing",
    //         state: {
    //           referrer: {
    //             items
    //           }
    //         }
    //       }}
    //     />
    //   );
    // }
    return (
      <div className="home">
        <div className="hero-container">
          <Header title={"AFFHomes"} userInfo={this.props.userInfo} />
          <h1>
            <br />
          </h1>
          <Search onClick={i => this.onClickSearch(i)} />
          <ul className="message-container">
            <li>
              <h4></h4>
              <small></small>
            </li>
            <li>
              <h4></h4>
              <small></small>
            </li>
            <li>
              <h4></h4>
              <small></small>
            </li>
          </ul>
        </div>
        {/* <RecentActivity /> */}
      </div>
    );
  }
}

export default Home;
