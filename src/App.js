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
  }
  constructor(){
    super()
    this.state = {
      restaurants: ['hi'],
      networks: [],
      stations: []
    }
  }

  searchYelp = (searchLocation, sortBy='distance') => {
    // Axios call for yelp data, uses Juno proxy
    const yelpUrl = `https://api.yelp.com/v3/businesses/search`;
    const yelpApiKey = `60l886Qycs9h_wC5Mg_GEdfIBdfzJ2oCL6-lPQcImfh57gu4W9udYJSt1QUdGFM-QXkwGEyNjJvkGAChBIT-4uupi7xVjjOucGT8XXXbirONqLZmbjC01vE4-BvnXXYx`;
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
        reqUrl: yelpUrl,
        proxyHeaders: {
          'Authorization': `Bearer ${yelpApiKey}`
        },
        params: {
          location: searchLocation,
          sort_by: sortBy
        },
        xmlToJSON: false
      }
    }).then((response) => {
      console.log('yelp response',response);
      this.setState({
        restaurants: response.data.businesses
      })
    })
  }

  // Performs an axios call to get all bike networks available on citybikes and store it in state
  getAllBikeNetworks = () => {
    const cityBikesUrl = `http://api.citybik.es/v2/networks/`;
    axios({
      url: cityBikesUrl,
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
    const cityBikesUrl = `http://api.citybik.es/v2/networks/`;
    axios({
      url: cityBikesUrl+networkEndpoint,
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
        <Route path ="/restaurant/:id" component={RestaurantDetails}/>
        <Footer/>
      </Router>
    )
  }
}

export default App;
