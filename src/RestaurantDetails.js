import React, { Component } from 'react';
import Qs from 'qs';
import axios from 'axios';


class RestaurantDetails extends Component {
    constructor() {
        super();
        this.state = {
            restaurantDetails: {},
            restaurantReviews: []
        };
    };

    componentDidMount() {
        axios({
            url: this.props.junoProxyUrl,
            method: 'GET',
            dataResponse: 'json',
            // paramSerializer included at the advice of:
            // https://github.com/HackerYou/bootcamp-notes/blob/master/applied-javascript/fetching-data-with-something-other-than%24.ajax.md#specifying-query-parameters-with-a-proxy-server
            // to match the requirements for the Juno proxy.
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `${this.props.yelpUrl}/${this.props.match.params.id}`,
                proxyHeaders: {
                    'Authorization': `Bearer ${this.props.yelpApiKey}`
                },
                params: {

                },
                xmlToJSON: false
            }
        }).then((result) => {
            console.log("restaurant details yelp api result", result);
            this.setState({
                restaurantDetails: result.data
            })
            axios({
                url: this.props.junoProxyUrl,
                method: 'GET',
                dataResponse: 'json',
                // paramSerializer included at the advice of:
                // https://github.com/HackerYou/bootcamp-notes/blob/master/applied-javascript/fetching-data-with-something-other-than%24.ajax.md#specifying-query-parameters-with-a-proxy-server
                // to match the requirements for the Juno proxy.
                paramsSerializer: function (params) {
                    return Qs.stringify(params, { arrayFormat: 'brackets' })
                },
                params: {
                    reqUrl: `${this.props.yelpUrl}/${this.props.match.params.id}/reviews`,
                    proxyHeaders: {
                        'Authorization': `Bearer ${this.props.yelpApiKey}`
                    },
                    // params: {

                    // },
                    xmlToJSON: false
                }
            }).then((result) => {
                console.log("restaurant reviews yelp api result", result)
                this.setState({
                    restaurantReviews: result.data.reviews
                })
            })
        })
    }

    // parseHours = (hoursArray) => {
    //     hoursArray.map((dayObject, index) => {
    //         if (index === 0) {

    //         }
    //     })
    // }

    render() {
        console.log("state restaurant reviews", this.state.restaurantReviews)
        return (
            <div className="wrapper">
                <div className="detailsContent">
                    <div className="restaurantDetails">
                        <h2>{this.state.restaurantDetails.name}</h2>
                        <img src={this.state.restaurantDetails.image_url} alt="" />
                        <p className="detailSub">Hours</p>

                        <p className="detailSub">Rating: {this.state.restaurantDetails.rating}</p>
                        <p className="detailSub">Cuisine: {(this.state.restaurantDetails.categories === undefined) ? null : (this.state.restaurantDetails.categories[0].title)}</p>
                        <p className="detailSub">Reviews</p>
                        {(this.state.restaurantReviews.length === 0) ? null : (this.state.restaurantReviews.map((restaurantObject) => {
                            return (
                                <blockquote cite={restaurantObject.url} key={restaurantObject.id}>
                                    <p>{restaurantObject.text}</p>
                                    <footer>- {restaurantObject.user.name}</footer>
                                </blockquote>
                            )
                        }))
                        }
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