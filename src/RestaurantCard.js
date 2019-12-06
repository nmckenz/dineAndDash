import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RestaurantCard extends Component {
    render() {
        console.log(this.props.singleRestaurant)

        return (
            <li key={this.props.singleRestaurant.id}>
                <img src={
                    (this.props.singleRestaurant.image_url === '') 
                    ? require('./assets/imagePlaceholder.jpg') 
                    : this.props.singleRestaurant.image_url} alt=""/>
                <div className="restaurantCardContent">
                    <div className="restaurantName">
                        <p>{this.props.singleRestaurant.name}</p>
                        <Link to={`/restaurant/${this.props.singleRestaurant.id}`}>Click here for more details</Link>
                    </div>
                    <div className="yelpStarsAndLogo">
                        <div className="starRating">
                            <a href={this.props.singleRestaurant.url} target="_blank" rel="noopener noreferrer"><img src={require("./assets/stars" + this.props.singleRestaurant.rating + ".png")} alt="" /></a>
                        </div>
                        <div className="yelpLogo">
                            <a href={this.props.singleRestaurant.url} target="_blank" rel="noopener noreferrer"><img src={require('./assets/yelpLogo.png')} alt="" /></a>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default RestaurantCard;