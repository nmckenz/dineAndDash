import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RestaurantCard extends Component {
    render() {
        // console.log(this.props.singleRestaurant)

        return (
            <li key={this.props.singleRestaurant.id}>
                
                {(this.props.singleRestaurant.image_url === '')
                    ? <img src={require('./assets/imagePlaceholder.jpg')} alt={`Smiling cat because Yelp has not provided one for ${this.props.singleRestaurant.name}`}/>
                
                    : <img src={this.props.singleRestaurant.image_url} alt={`${this.props.singleRestaurant.categories[0].title} food from ${this.props.singleRestaurant.name}`}/>}
            
                <div className="restaurantCardContent">
                    <div className="restaurantName">
                        <p>{this.props.singleRestaurant.name}</p>
                        <Link to={`/restaurant/${this.props.singleRestaurant.id}`}>Click here for more details</Link>
                    </div>
                    <div className="yelpStarsAndLogo">
                        <div className="starRating">
                            <a href={this.props.singleRestaurant.url} target="_blank" rel="noopener noreferrer"><img src={require("./assets/stars" + this.props.singleRestaurant.rating + ".png")} alt={`Star rating for ${this.props.singleRestaurant.name}`} /></a>
                        </div>
                        <div className="yelpLogo">
                            <a href={this.props.singleRestaurant.url} target="_blank" rel="noopener noreferrer"><img src={require('./assets/yelpLogo.png')} alt="Yelp logo" /></a>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default RestaurantCard;