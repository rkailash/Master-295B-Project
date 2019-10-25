import "./styles/property.css";
import React from "react";
const Property = props => {
  return (
    <div className="property">
      <span>Name : {props.Name}</span>
    </div>
  );
};

export default Property;
