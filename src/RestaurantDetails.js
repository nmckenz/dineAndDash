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
        window.scrollTo(0, 0);

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
                    xmlToJSON: false
                }
            }).then((result) => {
                console.log("restaurant reviews yelp api result", result)
                this.setState({
                    restaurantReviews: result.data.reviews
                })
            })
        })


        // importing mapbox image + functionalities
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

        mapboxgl.accessToken = 'pk.eyJ1IjoicGllcmNlbW9yYWxlcyIsImEiOiJjazN1YjAydTkwNmRvM2xtZWo3ZXI5cm44In0.mP0xBue4E9m2CEpDI-oQBA';
        const map = new mapboxgl.Map({
          container: "mapContent",
          style: "mapbox://styles/mapbox/streets-v11",
        //   starting point in map
        //   center: [-79.39, 43.64]
        });
        map.on("load", function() {
        map.loadImage(
            "https://upload.wikimedia.org/wikipedia/en/e/e0/Cycling_hardtail_sil.gif",
            function(error, image) {
                if (error) throw error;
                map.addImage("bike", image);
                map.addLayer({
                  id: "points",
                  type: "symbol",
                  source: {
                    type: "geojson",
                    data: {
                      type: "FeatureCollection",
                      features: [
                        {
                          type: "Feature",
                          geometry: {
                            type: "Point",
                            coordinates: [-79.39, 43.64]
                          }
                        }
                      ]
                    }
                  },
                  layout: {
                    "icon-image": "bike",
                    "icon-size": 0.1
                  }
                });
            }
        );
            });






    //componentDidMount ends
    }

    parse24HClock = (time) => {
        const timeArray = [...time];
        let hours = timeArray[0] + timeArray[1];
        let minutes = timeArray[2] + timeArray[3];
        const amOrPm = (parseInt(hours) >= 12) ? 'PM' : 'AM';
        if (parseInt(hours) > 12) {
            hours = (hours - 12).toString();
        } else if (timeArray[0] === "0") {
            hours = timeArray[1];
        }
        const timeString = `${hours}:${minutes} ${amOrPm}`;
        return timeString;
    }

    render() {
        console.log("state restaurant reviews", this.state.restaurantReviews)
        return (
            <div className="wrapper">
                <div className="detailsContent">
                    <div className="restaurantDetails">
                        <h2>{this.state.restaurantDetails.name}</h2>
                        <img src={(this.state.restaurantDetails.image_url === '') ? require('./assets/imagePlaceholder.jpg')
                            : this.state.restaurantDetails.image_url} alt="" />
                        <p className="detailSub">Hours: 
                        {(this.state.restaurantDetails.hours === undefined) ? null : (
                                this.state.restaurantDetails.hours[0].open.map((dayObject, index) => {
                                    if (dayObject.day === 0) {
                                        return (
                                            <p key={index}>Monday: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                        )
                                    } else if (dayObject.day === 1) {
                                        return (
                                            <p key={index}>Tuesday: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                        )
                                    } else if (dayObject.day === 2) {
                                        return (
                                            <p key={index}>Wednesday: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                        )
                                    } else if (dayObject.day === 3) {
                                        return (
                                            <p key={index}>Thursday: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                        )
                                    } else if (dayObject.day === 4) {
                                        return (
                                            <p key={index}>Friday: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                        )
                                    } else if (dayObject.day === 5) {
                                        return (
                                            <p key={index}>Saturday: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                        )
                                    } else if (dayObject.day === 6) {
                                        return (
                                            <p key={index}>Sunday: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                        )
                                    }
                                })
                            )
                        }
                        </p>

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
                        {/* <img src="https://via.placeholder.com/300" alt=""/> */}
                        <h2>Bikes Near You</h2>
                        <div className="bikeInfo">
                            <h3>placeholder text (bike share toronto)</h3>
                            <div id="mapContent" class="mapDetail">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RestaurantDetails;