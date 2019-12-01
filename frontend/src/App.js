import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./styles/app.scss";
import Search from "./Search";
import Home from "./Home";
import Listing from "./Listing";

import OwnerPost from "./OwnerPost";
import Property from "./Property";
import NPOPost from "./NPOPost";
import ModalExample from "./Modal";
class App extends Component {
  state = {
    userInfo: undefined
  };
  render() {
    const { userInfo } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Login setUserInfo={userInfo => this.setState({ userInfo })} />
              )}
            />
            <Route
              exact
              path="/Login"
              render={() => (
                <Login setUserInfo={userInfo => this.setState({ userInfo })} />
              )}
            />
            <Route path="/Register" component={Register} />
            <Route path="/Search" render={props => <Search {...props} />} />
            <Route path="/Home" render={() => <Home userInfo={userInfo} />} />
            <Route
              path="/Listing"
              render={props => <Listing userInfo={userInfo} {...props} />}
            />
            <Route path="/Login" render={() => <Login />} />
            <Route
              path="/OwnerPost"
              render={() => <OwnerPost userInfo={userInfo} />}
            />
            <Route
              path="/Property"
              render={() => <Property userInfo={userInfo} />}
            />
            <Route
              path="/NPOPost"
              render={() => <NPOPost userInfo={userInfo} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
