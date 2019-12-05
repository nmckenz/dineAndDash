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
                        <img src="https://via.placeholder.com/150" alt="" />
                        <p>rating:{}</p>
                        <p>cuisineType{}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptatum cupiditate modi asperiores sequi at distinctio. Nulla tempore dolores quis assumenda earum ea, animi delectus aliquam dicta soluta voluptate dolore sed eos minus, cumque vel ex suscipit quae officia velit temporibus amet. Animi aspernatur sequi maiores optio impedit quasi alias.</p>
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