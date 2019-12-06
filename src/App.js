import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Qs from 'qs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import RestaurantDetails from './RestaurantDetails';
import Footer from './Footer.js';

class App extends Component {
  componentDidMount(){
    // Grab bicycle network information at page load, as we will need this later
    this.getAllBikeNetworks();
  }
  constructor(){
    super()
    this.state = {
      restaurants: [],
      networks: [],
      stations: [],
      yelpUrl: `https://api.yelp.com/v3/businesses`,
      yelpApiKey: `60l886Qycs9h_wC5Mg_GEdfIBdfzJ2oCL6-lPQcImfh57gu4W9udYJSt1QUdGFM-QXkwGEyNjJvkGAChBIT-4uupi7xVjjOucGT8XXXbirONqLZmbjC01vE4-BvnXXYx`,
      cityBikesUrl: `http://api.citybik.es/v2/networks`,
      junoProxyUrl: `https://proxy.hackeryou.com`
    }
  }

  searchYelp = (searchLocation, sortBy='distance') => {
    // Axios call for yelp data, uses Juno proxy
    axios({
      url: this.state.junoProxyUrl,
      method:'GET',
      dataResponse: 'json',
      // paramSerializer included at the advice of:
      // https://github.com/HackerYou/bootcamp-notes/blob/master/applied-javascript/fetching-data-with-something-other-than%24.ajax.md#specifying-query-parameters-with-a-proxy-server
      // to match the requirements for the Juno proxy.
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      params: {
        reqUrl: `${this.state.yelpUrl}/search`,
        proxyHeaders: {
          'Authorization': `Bearer ${this.state.yelpApiKey}`
        },
        params: {
          location: searchLocation,
          sort_by: sortBy,
          limit: 24,
          categories: "restaurants, All"
        },
        xmlToJSON: false
      }
    }).then((response) => {
      console.log('yelp response',response);

      const yelpLocation = response.data.region.center;

      const closestNetwork = {
        bestId: "",
        sqDistance: Infinity
      };

      this.state.networks.forEach((network, index) => {
        // Square of the distance. Good enough for our purposes
        const sqDistance = Math.abs(network.location.latitude - yelpLocation.latitude)**2 + Math.abs(network.location.longitude - yelpLocation.longitude)**2;

        // If this distance is closer than the current best case, save it!
        if (sqDistance < closestNetwork.sqDistance) {
          closestNetwork.bestId = network.id;
          closestNetwork.sqDistance = sqDistance;
        }
      });

      if (closestNetwork.bestId !== "") {
        this.getSpecificBikeNetwork(closestNetwork.bestId);
      }

      this.setState({
        restaurants: response.data.businesses
      })
    })
  }

  // Performs an axios call to get all bike networks available on citybikes and store it in state
  getAllBikeNetworks = () => {
    axios({
      url: this.state.cityBikesUrl,
      method: 'GET',
      dataResponse: 'json'
    }).then((response) => {
      console.log('citybikes response', response);
      this.setState({
        networks:response.data.networks
      })
    })
  }

  // Given an endpoint, does an axios call to get all stations within that network
  getSpecificBikeNetwork = (networkEndpoint) => {
    axios({
      url: `${this.state.cityBikesUrl}/${networkEndpoint}`,
      method: 'GET',
      dataResponse: 'json'
    }).then((response) => {
      console.log('citybikes response', response);

      this.setState({
        stations:response.data.network.stations
      })
    })
  }

  render(){
    return(
      <Router>
        {/* Home */}
        <Route
          exact path="/"
          render = {() => <Home searchFunction={this.searchYelp} restaurants={this.state.restaurants} />}
        />
        {/* Restaurant details */}
        <Route
          path ="/restaurant/:id"
          // Pass down the "match" object as a prop, as well a the bikestations array
          render={ ({match}) => {
              return (
                <RestaurantDetails
                  match={match}
                  bikeStations={this.state.stations}
                  junoProxyUrl={this.state.junoProxyUrl}
                  yelpUrl={this.state.yelpUrl}
                  yelpApiKey={this.state.yelpApiKey}
                />
              )
            }
          }
          />
        <Footer/>
      </Router>
    )
  }
}

export default App;
