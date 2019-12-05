import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Qs from 'qs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './Header.js';
import SearchResults from './SearchResults.js';
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
      restaurants: ['hi'],
      networks: [],
      stations: [],
      yelpUrl: `https://api.yelp.com/v3/businesses`,
      yelpApiKey: `60l886Qycs9h_wC5Mg_GEdfIBdfzJ2oCL6-lPQcImfh57gu4W9udYJSt1QUdGFM-QXkwGEyNjJvkGAChBIT-4uupi7xVjjOucGT8XXXbirONqLZmbjC01vE4-BvnXXYx`,
      cityBikesUrl: `http://api.citybik.es/v2/networks`
    }
  }

  searchYelp = (searchLocation, sortBy='distance') => {
    // Axios call for yelp data, uses Juno proxy
    axios({
      url: 'https://proxy.hackeryou.com',
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
          sort_by: sortBy
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
        <Header
          searchFunction={this.searchYelp}
        />
        {(this.state.restaurants.length > 0) ?
          <Route
            exact path="/"
            render={ () => {
              return (
                <SearchResults
                  restaurants={this.state.restaurants}
                />
              )
            } }
          />
          : null}
        <Route
          path ="/restaurant/:id"
          // Pass down the "match" object as a prop, as well a the bikestations array
          render={ ({match}) => {
              return (
                <RestaurantDetails
                  match={match}
                  bikeStations={this.state.stations}
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
