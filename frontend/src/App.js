import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./styles/app.scss";
import Search from "./Search";
import Home from "./Home";
import Listing from "./Listing";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route path="/Register" component={Register} />
            <Route path="/Search" render={props => <Search {...props} />} />
            <Route path="/Home" render={props => <Home {...props} />} />
            <Route path="/Listing" render={props => <Listing {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
