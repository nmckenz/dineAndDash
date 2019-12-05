import React, { Component } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard.js'

class SearchResults extends Component {
    render() {
        return (
            <section className="searchResults">
                <h1>Search Results</h1>
                <div className="restaurantCards">
                    <div className="wrapper">
                        <ul>
                            {this.props.restaurants.map((singleRestaurant) => {
                                return <RestaurantCard singleRestaurant={singleRestaurant}/>
                            })
                            }
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default SearchResults;