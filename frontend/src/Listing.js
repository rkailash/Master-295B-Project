import React, { Component } from "react";
import ImageGallery from "./ImageGallery";
import RatingDisplay from "./RatingDisplay";
import { Link } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
// import "./styles/listing.scss";
import { images } from "./images";
// import { listenerCount } from "cluster";
import Property from "./Property";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const { temp } = this.props.location.state.referrer.items;
    // let array = [
    //   { Name: "33 South", Street: "3rd Street" },
    //   { Name: "101 South", Street: "South Street" }
    // ];
    // const { temp } = this.props.location.state.referrer;
    return (
      <ul>
        {this.props.location.state.referrer.items.map(item => (
          <li key={item}>
            <div>
              <Property Name={item.address}  Zip={item.zip_code} />
            </div>
          </li>
        ))}
      </ul>
      // <div className="listing">
      //   <div className="top-container">
      //     <Header showLogin userInfo={this.props.userInfo} />
      //     <Search query={this.props.query} />
      //   </div>
      //   <div className="list-container">
      //     <h4>{`We found ${items.length} result${
      //       items.length === 1 ? "" : "s"
      //     } for you.`}</h4>
      //     {items.map((item, key) => (
      //       <div className="list-item" key={key}>
      //         <ImageGallery
      //           showThumbnail={false}
      //           images={images[this.props.userInfo.userid]}
      //         />
      //         <div className="right-container">
      //           <div className="top-container">
      //             {/* <Link to={`/Property/${item.propertyid}`}>
      //               <h4>{item.name}</h4>
      //             </Link> */}
      //             <div className="property-info">
      //               <span>{`${
      //                 item.bedrooms === 0
      //                   ? "Studio"
      //                   : `${item.bedrooms} BR Apartment`
      //               }`}</span>
      //               <span>{`${item.bathrooms} Bath`}</span>
      //               <span>{`${item.area} sq ft`}</span>
      //               <span>{`Sleeps ${item.sleeps}`}</span>
      //             </div>
      //           </div>
      //           <div className="bottom-strip">
      //             <p>{`$${item.price} per night`}</p>
      //             <RatingDisplay rating={item.rating} />
      //           </div>
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // </div>
    );
  }
}

export default Listing;
