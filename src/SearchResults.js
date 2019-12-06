import React, { Component } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard.js'

class SearchResults extends Component {
    componentDidMount() {
        const resultsSection = document.getElementById("searchResults");
        resultsSection.scrollIntoView();
    }
    render() {
        return (
            <section className="searchResults" id="searchResults">
                <div className="wrapper">
                    <h2>Search Results</h2>
                    <ul>
                        {this.props.restaurants.map((singleRestaurant) => {
                            return <RestaurantCard singleRestaurant={singleRestaurant}/>
                        })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

export default SearchResults;