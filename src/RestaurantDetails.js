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
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

        mapboxgl.accessToken = 'pk.eyJ1IjoicGllcmNlbW9yYWxlcyIsImEiOiJjazN1YjAydTkwNmRvM2xtZWo3ZXI5cm44In0.mP0xBue4E9m2CEpDI-oQBA';
        const map = new mapboxgl.Map({
            container: 'mapContent',
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    }

    parseHours = (hoursArray) => {
        let jsxReturn = ``;
        parseMilitaryTime = (time) => {
            const timeInterger = parseInt(time);
            const amOrPm = (timeInterger >= 1200) ? 'PM' : 'AM';
            let time12H;
            if (timeInterger >= 1300) {
                const hour = (parseInt((timeInterger - 1200)/100)).toString()
                let minute = ((timeInterger - 1200) % 100) || '00'
                if (minute < 10) {
                    minute = '0' + minute.toString()
                } else {
                    minute = minute.toString()
                }
                time12H = `${hour}:${minute} ${amOrPm}`
            } else if ()
        }
        hoursArray.map((dayObject, index) => {
            if (index === 0) {
                jsxReturn += `<p>Monday: `
            }
        })
    }

    // const formatDate = function (date) {
    //     const time = new Date(date);
    //     const hh = time.getHours();
    //     const mm = time.getMinutes();
    //     let h = hh;
    //     let dd = "AM";
    //     let m = mm;
    //     if (h >= 12) {
    //         h = hh - 12;
    //         dd = "PM";
    //     }
    //     if (h === 0) {
    //         h = 12;
    //     }
    //     if (m < 10) {
    //         m = "0" + mm;
    //     }
    //     return `${h}:${m} ${dd}`
    // }

//     let getStartTime = function () {
//     // the objective of this function is to get an array of timein values that are typeof date (object)
//     $allTimeInInputs.each((index) => {
//         // use jQuery method .each() to create a function that will execute for each timein input
//         let timeinString = $(`#timein${index + 1}`).val();
//         // using jQuery method: .val()
//         // get the value of each timein input
//         // inputs return typeof string
//         let timeinObject = timeinString.split(':');
//         // remove the colons
//         // this returns typeof object
//         // note the values in each index are still typeof string
//         let timeinHour = timeinObject[0];
//         let timeinMinute = timeinObject[1];
//         // assign each index to a variable
//         let startingTime = new Date("1970-1-1 " + `${timeinHour}:${timeinMinute}`);
//         // using JS method: new Date()
//         // "convert" timein input with typeof string to typeof date (object)
//         allStartingTimes = startingTime.getTime();
//         // get all timein inputs with typeof date (object) using JS method: .getTime()
//         workday.startTime.unshift(allStartingTimes);
//         // using JS method: .unshift()
//         // insert values from allStartingTimes to the beginning of our array: workday.startTime
//         workday.startTime = workday.startTime.slice(0, 7);
//         // using JS method: .slice()
//         // extract indexes 0-6
//     });
// }

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
                        {/* {(this.state.restaurantDetails.hours === undefined) ? null : (this.parseHours(this.state.restaurantDetails.hours[0].open))} */}
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