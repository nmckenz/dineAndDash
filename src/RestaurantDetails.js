import React, { Component } from 'react';
import Qs from 'qs';
import axios from 'axios';


class RestaurantDetails extends Component {
    constructor() {
        super();
        this.state = {
            restaurantDetails: {},
            restaurantReviews: [],
            nearestBikeStation: -1,
            map: {}
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
            // Get the closest city bikes stations if they don't already exist
            if (this.props.bikeStations.length===0) {
                this.props.bikesGetFunction(result.data.coordinates);
            }
            
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
        this.setState({
            map: map
        })


        
        map.on("load",() => {
        map.addSource("bikes", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: []
            }
        })
        map.addSource("restaurant", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: []
            }
        })
        map.addLayer({
            id: "restaurant",
            type: "circle",
            source: "restaurant",
            paint: {
                "circle-radius": 10,
                "circle-color": "#350482"
            }
        })

        map.loadImage(
            "https://upload.wikimedia.org/wikipedia/en/e/e0/Cycling_hardtail_sil.gif",
            (error, image) => {
                if (error) throw error;
                map.addImage("bike", image);
                map.addLayer({
                    id: "bikes",
                    type: "symbol",
                    source: "bikes",
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

    getNearestStation = () => {
        // if all of the data is available to do the work...
        if (this.state.nearestBikeStation < 0 && 'coordinates' in this.state.restaurantDetails && this.props.bikeStations.length >0) {

            const coordinates = this.state.restaurantDetails.coordinates;



            const bestStation = {
                id: -1,
                sqDistance: Infinity
            }



            this.props.bikeStations.forEach((station,index) => {
                const sqDistance = (station.latitude - coordinates.latitude)**2 + (station.longitude - coordinates.longitude)**2;
                if (station.free_bikes>0 && sqDistance < bestStation.sqDistance) {
                    bestStation.id = index;
                    bestStation.sqDistance = sqDistance;
                }
            });
            if (bestStation.id >= 0) {
                this.setState({
                    nearestBikeStation: bestStation.id
                })
            }
        }
    }

    render() {
        if("coordinates" in this.state.restaurantDetails && this.state.map.loaded()){
                this.state.map.getSource("restaurant").setData({
                type: "Point",
                coordinates: [
                    this.state.restaurantDetails.coordinates.longitude,
                    this.state.restaurantDetails.coordinates.latitude
                ]
            })
        }
        if (this.state.nearestBikeStation >= 0 && this.state.map.loaded()){
            this.state.map.getSource("bikes").setData({
                type: "Point",
                coordinates: [
                    this.props.bikeStations[this.state.nearestBikeStation].longitude,
                    this.props.bikeStations[this.state.nearestBikeStation].latitude
                ]
            })
        }
        

        console.log("state restaurant reviews", this.state.restaurantReviews)
        this.getNearestStation();
        return (
            <div className="detailsContent">
                <div className="wrapper">

                    <div className="restaurantDetails">
                        <h2>{this.state.restaurantDetails.name}</h2>
                        <img src={(this.state.restaurantDetails.image_url === '') ? require('./assets/imagePlaceholder.jpg')
                            : this.state.restaurantDetails.image_url} alt="" />

                        <div className="restaurantContactInfo">
                            <div className="flexContainerRestaurantDetails">
                                <p className="detailSub">Address:</p>
                                <div>{(this.state.restaurantDetails.location === undefined) ? null : this.state.restaurantDetails.location.display_address.map((addressLine, index) => {
                                    return (<p key={index}>{addressLine}</p>)})}
                                </div>
                            </div>

                            <div className="flexContainerRestaurantDetails">
                                <p className="detailSub">Phone: </p> 
                                <p>{this.state.restaurantDetails.display_phone}</p>
                            </div>

                            <div className="flexContainerRestaurantDetails">
                                <p className="detailSub">Hours:</p>
                                <div>
                                    {(this.state.restaurantDetails.hours === undefined) ? (<p>Please call</p>) : (
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
                                </div>
                            </div>{/* closing tag for flexContainerRestaurantDetails */}
                            
                            <div className="flexContainerRestaurantDetails">
                                <p className="detailSub">Rating: </p>
                                <p>{this.state.restaurantDetails.rating}</p> 
                            </div>

                            <div className="flexContainerRestaurantDetails">
                                <p className="detailSub">Cuisine: </p>
                                <p>{(this.state.restaurantDetails.categories === undefined) ? null : (this.state.restaurantDetails.categories[0].title)}</p>
                            </div>

                        </div>{/* closing tag for restaurantContactInfo */}


                        <div className="restaurantReviews">
                            <div className="flexContainerRestaurantDetails">
                                <p className="detailSub">Reviews: </p>
                                <div>
                                    {(this.state.restaurantReviews.length === 0) ? null : (this.state.restaurantReviews.map((reviewObject) => {
                                        return (
                                            <blockquote cite={reviewObject.url} key={reviewObject.id} className="reviewCard">
                                                <p>{reviewObject.text} </p>
                                                <div className="reviewYelpLink">
                                                    <a href={reviewObject.url} target="_blank" rel="noopener noreferrer" ><span>Read more</span> on <img src={require('./assets/yelpLogoIconOnly.png')} alt="" className="detailsYelpLogo"/></a>
                                                </div>
                                                <div className="nameOfUser">
                                                    <p>- {reviewObject.user.name}</p>
                                                </div>
                                            </blockquote>
                                        )
                                    }))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>{/* closing tag for restaurantDetails */}


                    <div className="bikeDetails">
                        {/* <img src="https://via.placeholder.com/300" alt=""/> */}
                        <h2>Bikes Near You</h2>
                        {(this.state.nearestBikeStation>=0) ?
                            <p>The nearest bike station is {this.props.bikeStations[this.state.nearestBikeStation].name}</p> :
                            null}
                        <div className="bikeInfo">
                            <h3>placeholder text (bike share toronto)</h3>
                            <div id="mapContent" className="mapDetail">

                            </div>
                        </div>
                    </div>

                    
                </div>{/* closing tag for wrapper */}
            </div>// closing tag for detailsContent
        )
    }
}

export default RestaurantDetails;