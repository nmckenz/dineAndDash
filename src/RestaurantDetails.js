import React, { Component } from 'react';
import axios from 'axios';


class RestaurantDetails extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }






    render() {
        return (
            <div className="wrapper">
                <div className="detailsContent">
                    <div className="restaurantDetails">
                        <h2>Restaurant Title</h2>
                        <img src="https://via.placeholder.com/300" alt="" />
                        <p className="detailSub">Hours</p>

                        <p className="detailSub">Rating:{}</p>
                        <p className="detailSub">cuisineType{}</p>
                        <p>review</p>
                    </div>
                    <div className="bikeDetails">
                        <img src="https://via.placeholder.com/300" alt=""/>
                        <h2>Bikes Near You</h2>
                        <div className="bikeInfo">
                            <h3>placeholder text (bike share toronto)</h3>
                            <p>Bikes Avaiable:</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RestaurantDetails;