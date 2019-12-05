import React, { Component } from 'react';
import axios from 'axios';

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
                    </div>
                    <div className="yelpStarsAndLogo">
                        <div className="starRating">
                            <img src={require("./assets/stars" + this.props.singleRestaurant.rating + ".png")} alt="" />
                        </div>
                        <div className="yelpLogo">
                            <a href={this.props.singleRestaurant.url}><img src={require('./assets/yelpLogo.png')} alt="" /></a>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default RestaurantCard;