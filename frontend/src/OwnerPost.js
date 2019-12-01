import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./styles/ownerPost.scss";
import Header from "./Header";
import ModalComponent from "./Modal";
class OwnerPost extends Component {
  state = {
    modal: false,
    desc: "",
    street: "",
    zipcode: "",
    rent: "",
    area: "",
    distFrmUniv: "",
    distFrmCaltrain: "",
    amenities: "",
    utils: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    const {
      desc,
      street,
      zipcode,
      rent,
      area,
      distFrmUniv,
      distFrmCaltrain,
      amenities,
      utils
    } = this.state;
    return (
      <div className="property-form">
        <div className="owner-post">
          <Header title={"Post your Property"} userInfo={this.props.userInfo} />
          <form onSubmit={this.handleSubmit} className="k-form">
            <div className="column">
              <textarea
                name="desc"
                placeholder="Description"
                tabIndex={1}
                value={desc}
                onChange={this.handleChange}
              ></textarea>
              <input
                name="street"
                placeholder="Street"
                tabIndex={2}
                value={street}
                onChange={this.handleChange}
              ></input>
              <input
                name="zipcode"
                placeholder="ZipCode"
                tabIndex={3}
                value={zipcode}
                onChange={this.handleChange}
              />
              <input
                name="rent"
                placeholder="Rent"
                tabIndex={4}
                value={rent}
                onChange={this.handleChange}
              ></input>
              <input
                name="area"
                placeholder="Area"
                tabIndex={5}
                value={area}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="column">
              <input
                name="distFrmUniv"
                placeholder="Distance from Campus"
                tabIndex={6}
                value={distFrmUniv}
                onChange={this.handleChange}
              ></input>
              <input
                name="distFrmCaltrain"
                placeholder="Distance from CalTrain"
                tabIndex={7}
                value={distFrmCaltrain}
                onChange={this.handleChange}
              ></input>
              <input
                name="amenities"
                placeholder="Amenities"
                tabIndex={8}
                value={amenities}
                onChange={this.handleChange}
              ></input>
              <input
                name="utils"
                placeholder="Utilities"
                tabIndex={9}
                value={utils}
                onChange={this.handleChange}
              ></input>

              <button onClick={this.handleSubmit}>Submit</button>
              <button type="button" onClick={this.toggle}>
                Predict
              </button>

              <input type="reset" value="Clear"></input>
            </div>
            <Modal isOpen={this.state.modal}>
              <ModalBody>
                Property is overpriced. Sure you want to keep it this way?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.toggle}>
                  Dismiss
                </Button>
              </ModalFooter>
            </Modal>
          </form>
        </div>
      </div>
    );
  }
}

export default OwnerPost;
