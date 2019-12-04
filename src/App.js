import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
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
      restaurants: [],
      networks: [],
      stations: []
    }
  }
  render(){
    return(
      <Router>
        <Header/>
        {(this.state.restaurants.length > 0) ? <Route exact path="/" component={SearchResults}/> : null}
        <Route path ="/restaurant/:id" component={RestaurantDetails}/>
        <Footer/>
      </Router>
    )
  }
}

export default App;
