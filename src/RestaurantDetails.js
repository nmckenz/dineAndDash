import React, { Component } from 'react';
import Qs from 'qs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Flickity from 'react-flickity-component';
// register fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Map from './Map';

// Detailed view of a given restaurant
class RestaurantDetails extends Component {
    constructor() {
        super();
        this.state = {
            restaurantDetails: {},
            restaurantReviews: [],
            directions: [],
            waypoints: [],
            nearestBikeStation: -1,
        };
    };

    componentDidMount() {
        window.scrollTo(0, 0);

        // Call the Yelp API for restaurant details
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
            // Success! Save the data
            this.setState({
                restaurantDetails: result.data
            }, () => {
                // Once the restaurant details have been saved to state...
                // Get the closest city bikes stations if they don't already exist
                if (this.props.bikeStations.length===0) {
                    this.props.bikesGetFunction(result.data.coordinates, this.getNearestStation);
                }
                else {
                    // If they exist, just directly try to figure it out
                    this.getNearestStation();
                }
            })
            // Yelp call to get reviews
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
                // Success! Save the reviews.
                this.setState({
                    restaurantReviews: result.data.reviews
                });
            }).catch(() => {
                // No reviews found. This isn't catastrophic. Just leave the array empty.
                this.setState({
                    restaurantReviews: []
                })
            });
        }).catch(() => {
            // Tragedy! No yelp details found.
            this.yelpError();
        })
    //componentDidMount ends
    }


    // Take a time and display convert it to a human-readable string
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

    // Given the currently available list of bike stations, find the nearest bike station
    getNearestStation = () => {
        // if all of the data is available to do the work...
        if (this.state.nearestBikeStation < 0 && 'coordinates' in this.state.restaurantDetails && this.props.bikeStations.length >0) {

            // Coordinates from restaurant details
            const coordinates = this.state.restaurantDetails.coordinates;

            // Keep track of the best station
            const bestStation = {
                id: -1,
                sqDistance: Infinity
            }

            this.props.bikeStations.forEach((station,index) => {
                // make sure coordinates are in the station object
                if ('latitude' in station && 'longitude' in station) {
                    // Find the distance, and see if it's closer than the current best case
                    const sqDistance = (station.latitude - coordinates.latitude)**2 + (station.longitude - coordinates.longitude)**2;
                    if (station.free_bikes>0 && sqDistance < bestStation.sqDistance) {
                        bestStation.id = index;
                        bestStation.sqDistance = sqDistance;
                    }
                }
            });
            // If a best case was found...
            if (bestStation.id >= 0) {
                // ..record it, and then...
                this.setState({
                    nearestBikeStation: bestStation.id
                }, () => {
                    // ...get directions to the bike station!
                    this.getDirections(this.state.restaurantDetails.coordinates.latitude, this.state.restaurantDetails.coordinates.longitude, this.props.bikeStations[this.state.nearestBikeStation].latitude, this.props.bikeStations[this.state.nearestBikeStation].longitude)
                })
            }
        }
    }

    // MapBox query to get directions
    getDirections = (restaurantLat, restaurantLong, bikeLat, bikeLong) => {
        axios({
            url: `https://api.mapbox.com/directions/v5/mapbox/walking/${restaurantLong},${restaurantLat};${bikeLong},${bikeLat}`,
            method: 'GET',
            dataResponse: 'json',
            params: {
                steps: true,
                banner_instructions: true,
                access_token: `pk.eyJ1IjoibWFjaGlhdmVsbGk5OTg4IiwiYSI6ImNrM3QwdWxtcjBjd3QzYnBvcXB4dDJ4ejYifQ.QngVoflfq_NkBYKbAohhPQ`
            }
        }).then((result) => {
            const waypointsArray = result.data.routes[0].legs[0].steps.map((directionObject) => {
                const coordArray = [directionObject.maneuver.location[0], directionObject.maneuver.location[1]]
                return coordArray
            })
            this.setState({
                directions: result.data.routes[0].legs[0].steps,
                waypoints: waypointsArray
            })
        })
    }

    // Something went wrong with yelp. Oh no!
    yelpError = () => {
        this.setState({
            restaurantDetails: {
                name: "Error - No Details Found!",
                image_url: "",
            }
        });
    }

    render() {

        const flickityOptions = {
            prevNextButtons: false
        }

        return (
            <div className="detailsContent">
                <div className="wrapper">

                    <Link to="/" aria-label="back button">

                        <div className="backBtnContainer">
                            <button className="navButton backButton">
                                <FontAwesomeIcon icon={faArrowCircleLeft}/> 
                            <p className="backText">Return to Search Results</p>
                            </button>
                        </div>
                    </Link>

                    <div className="restaurantDetails">
                        <h2>{this.state.restaurantDetails.name}</h2>
                        <img src={(this.state.restaurantDetails.image_url === '') ? require('./assets/imagePlaceholder.jpg')
                            : this.state.restaurantDetails.image_url} alt={`Smiling cat because Yelp has not provided one for ${this.state.restaurantDetails.name}`} />

                        <div className="restaurantContactInfo">
                            <div className="flexContainerRestaurantDetails">
                                <h3>Address:</h3>
                                <div>{(this.state.restaurantDetails.location === undefined) ? null : this.state.restaurantDetails.location.display_address.map((addressLine, index) => {
                                    return (<p className="info" key={index}>{addressLine}</p>)})}
                                </div>
                            </div>

                            <div className="flexContainerRestaurantDetails">
                                <h3>Phone: </h3> 
                                <p className="info">{this.state.restaurantDetails.display_phone}</p>
                            </div>

                            <div className="flexContainerRestaurantDetails">
                                <h3>Hours:</h3>
                                <div>
                                    {(this.state.restaurantDetails.hours === undefined) ? (<p className="info">Please call</p>) : (
                                        this.state.restaurantDetails.hours[0].open.map((dayObject, index) => {
                                            // Get day name from array
                                            const days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'];
                                            if (dayObject.day>=0 && dayObject.day < days.length) {
                                                return (
                                                    <p className="info" key={index}>{days[dayObject.day]}: {this.parse24HClock(dayObject.start)} - {this.parse24HClock(dayObject.end)}</p>
                                                )
                                            }
                                            return null;
                                        })
                                    )
                                }
                                </div>
                            </div>{/* closing tag for flexContainerRestaurantDetails */}
                            
                            <div className="flexContainerRestaurantDetails">
                                <h3>Rating: </h3>
                                <div className="starRating">
                                    {
                                        (this.state.restaurantDetails.rating) ?
                                        <a href={this.state.restaurantDetails.url} target="_blank" rel="noopener noreferrer">
                                        <img src={require("./assets/stars" + this.state.restaurantDetails.rating + ".png")} alt={`Star rating of ${this.state.restaurantDetails.rating} for ${this.state.restaurantDetails.name}`} /></a>
                                        : null
                                    }
                                </div>
                            </div>

                            <div className="flexContainerRestaurantDetails">
                                <h3>Cuisine: </h3>
                                <p className="info">{(this.state.restaurantDetails.categories === undefined) ? null : (this.state.restaurantDetails.categories[0].title)}</p>
                            </div>

                        </div>{/* closing tag for restaurantContactInfo */}


                        <div className="restaurantReviews">
                            <div className="flexContainerRestaurantDetails">

                                <h3>Reviews:</h3>
                                <Flickity
                                    className={'carousel'} // default ''
                                    elementType={'div'} // default 'div'
                                    options={flickityOptions} // takes flickity options {}
                                    reloadOnUpdate={true}
                                >
                                    {(this.state.restaurantReviews.length === 0) ? null : (this.state.restaurantReviews.map((reviewObject) => {
                                        return (
                                            <blockquote cite={reviewObject.url} key={reviewObject.id} className="reviewCard">
                                                <p>{reviewObject.text}</p>
                                                <div className="reviewYelpLink">
                                                    <a href={reviewObject.url} target="_blank" rel="noopener noreferrer">Read more on Yelp <img src={require('./assets/yelpLogoIconOnly.png')} alt="Yelp logo" className="detailsYelpLogo"/></a>
                                                </div>
                                                <div className="nameOfUser">
                                                    <p>- {reviewObject.user.name}</p>
                                                </div>
                                            </blockquote>
                                        )
                                    }))
                                    }
                                </Flickity>

                            </div>
                        </div>

                    </div>{/* closing tag for restaurantDetails */}


                    <div className="bikeDetails">
                        {/* <img src="https://via.placeholder.com/300" alt=""/> */}
                        <h2>Bikes Near You</h2>
                        {/* Mapbox component */}
                        <Map
                            restaurantDetails={this.state.restaurantDetails}
                            nearestBikeStation={this.state.nearestBikeStation}
                            bikeStations={this.props.bikeStations}
                            waypoints={this.state.waypoints}
                        />
                        <div className="bikeInfo">
                            <h3>Nearest Station:</h3>
                            {(this.state.nearestBikeStation >= 0) ?
                                <p>The nearest bike station is {this.props.bikeStations[this.state.nearestBikeStation].name}</p> :
                                (
                                    (this.props.failedBikeSearch) ?
                                    <p>No nearby bike station found!</p> :
                                    null
                                )
                            }
                            <h3>Directions (walking):</h3>

                            <ul>
                                {(this.state.directions === undefined) ? (<p>Turn-by-turn directions are not available at this time!</p>) : (this.state.directions.map((directionObject, index) => {
                                    if (index === (this.state.directions.length - 1)) {
                                        return (
                                            <li key={index}>
                                                {directionObject.maneuver.instruction}. Ride like the wind scofflaw!
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li key={index}>
                                                {directionObject.maneuver.instruction}, walking {directionObject.distance} metres (approx. {directionObject.duration} seconds)
                                            </li>
                                        )
                                    }
                                }))}
                            </ul>
                        </div>
                    </div>
                </div>{/* closing tag for wrapper */}
            </div>// closing tag for detailsContent
        )
    }
}

export default RestaurantDetails;