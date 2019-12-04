import React, { Component } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard.js'
import './partials/RestaurantCard.scss'

class SearchResults extends Component {
    render() {
        return (
            <div>
                <h1>Search Results</h1>
                <RestaurantCard />
            </div>
        )
    }
}

export default SearchResults;