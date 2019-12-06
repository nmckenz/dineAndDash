import React, { Component } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard.js';
import ReactDOM from 'react-dom';

class SearchResults extends Component {
    componentDidMount() {
        const resultsRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        window.scrollTo(0, resultsRect.top)
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