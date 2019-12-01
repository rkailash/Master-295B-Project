import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./styles/header.scss";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }
  onClickLogin = option => {
    this.props.onClick(option.value);
  };
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  render() {
    const { dropdownOpen } = this.state;
    return (
      <div className="header">
        {this.props.title && <h2>{this.props.title}</h2>}
        <div className="k-dropdown">
          <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{this.props.userInfo}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}

export default Header;
