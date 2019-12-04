import React, { Component } from 'react';
import axios from 'axios';

class RestaurantCard extends Component {
    render() {
        return (
            <section className="restaurantCards">
                <div className="wrapper">
                    <ul>
                        <li>
                            <img src="https://via.placeholder.com/150.jpg" alt=""/>
                            <p>Restaurant Name & Rating</p>
                            <p>Short Description (if available)</p>
                        </li>
                        <li>
                            <img src="https://via.placeholder.com/150.jpg" alt="" />
                            <p>Restaurant Name & Rating</p>
                            <p>Short Description (if available)</p>
                        </li>
                        <li>
                            <img src="https://via.placeholder.com/150.jpg" alt="" />
                            <p>Restaurant Name & Rating</p>
                            <p>Short Description (if available)</p>
                        </li>
                        <li>
                            <img src="https://via.placeholder.com/150.jpg" alt="" />
                            <p>Restaurant Name & Rating</p>
                            <p>Short Description (if available)</p>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
}

export default RestaurantCard;