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
      this.setState({
        restaurants: response.data.businesses
      })
    })
  }

  render(){
    return(
      <Router>
        <Header
          searchFunction={this.searchYelp}
        />
        {(this.state.restaurants.length > 0) ? <Route exact path="/" component={SearchResults}/> : null}
        <Route path ="/restaurant/:id" component={RestaurantDetails}/>
        <Footer/>
      </Router>
    )
  }
}

export default App;
