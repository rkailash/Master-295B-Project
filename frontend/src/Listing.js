import React, { Component } from "react";
import ImageGallery from "./templates/ImageGallery";
import RatingDisplay from "./templates/RatingDisplay";
import { Link } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import "./styles/listing.scss";
import { images } from "./images";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { items } = this.props.location.state.referrer;
    // const items = [
    //   {
    //     propertyid: 1,
    //     name: "Property 1",
    //     total_size: 3000,
    //     rental_space: 500,
    //     price: 103475,
    //     rental_month: 19156
    //   },
    //   {
    //     propertyid: 2,
    //     name: "Property 2",
    //     total_size: 3000,
    //     rental_space: 500,
    //     price: 103475,
    //     rental_month: 19156
    //   },
    //   {
    //     propertyid: 3,
    //     name: "Property 3",
    //     total_size: 3000,
    //     rental_space: 500,
    //     price: 103475,
    //     rental_month: 19156
    //   },
    //   {
    //     propertyid: 4,
    //     name: "Property 4",
    //     total_size: 3000,
    //     rental_space: 500,
    //     price: 103475,
    //     rental_month: 19156
    //   },
    //   {
    //     propertyid: 5,
    //     name: "Property 5",
    //     total_size: 3000,
    //     rental_space: 500,
    //     price: 103475,
    //     rental_month: 19156
    //   },
    //   {
    //     propertyid: 6,
    //     name: "Property 6",
    //     total_size: 3000,
    //     rental_space: 500,
    //     price: 103475,
    //     rental_month: 19156
    //   },
    //   {
    //     propertyid: 7,
    //     name: "Property 7",
    //     total_size: 3000,
    //     rental_space: 500,
    //     price: 103475,
    //     rental_month: 19156
    //   }
    // ];
    var rec_results = items.slice(130, 150);
    var res = items.slice(1, 100);
    const { userInfo } = this.props;
    return (
      <div className="listing">
        <Header title={"AFFHomes"} userInfo={userInfo} />
        <div className="left-column">
          <div className="top-bar">
            <h4>{`Found ${res.length} result${
              res.length === 1 ? "" : "s"
            }`}</h4>
          </div>
          <div className="scrolling-container">
            {res.map((item, key) => (
              <div className="list-item" key={key}>
                <ImageGallery showThumbnail={false} images={images[0]} />
                <div className="right-container">
                  <div className="top-container">
                    <Link to={`/Property/${item.propertyid}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <div className="property-info">
                      <span>{`${item.total_size} sq ft`}</span>
                      <span>{`Rental Space${item.rental_space} sq ft`}</span>
                      <span>{`Price ${item.price} $`}</span>
                      <span>{`Monthly rental ${item.rental_month}`}</span>
                      <span>{`ZipCode ${item.zip_code}`}</span>
                    </div>
                  </div>
                  <div className="bottom-strip">
                    <p>{`$${item.price}`}</p>
                    {/* <RatingDisplay rating={item.rating} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right-column">
          <h4>{`Recommended ${rec_results.length} result${
            items.length === 1 ? "" : "s"
          } for you.`}</h4>
          <div className="scrolling-container">
            {rec_results.map((item, key) => (
              <div className="list-item" key={key}>
                <ImageGallery showThumbnail={false} images={images[0]} />
                <div className="right-container">
                  <div className="top-container">
                    <Link to={`/Property/${item.propertyid}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <div className="property-info">
                      <span>{`${item.total_size} sq ft`}</span>
                      <span>{`Rental Space${item.rental_space} sq ft`}</span>
                      <span>{`Price ${item.price} $`}</span>
                      <span>{`Monthly rental ${item.rental_month}`}</span>
                      <span>{`ZipCode ${item.zip_code}`}</span>
                    </div>
                  </div>
                  <div className="bottom-strip">
                    <p>{`$${item.price}`}</p>
                    {/* <RatingDisplay rating={item.rating} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
