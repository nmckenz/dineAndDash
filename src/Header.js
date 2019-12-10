import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// register sweetalerts2
import Swal from 'sweetalert2';

// Header component
class Header extends Component {
    constructor() {
        super();
        this.state = {
            userInput: ""
        }
    }

    handleChangeCityInput = (event) => {
        this.setState({
            userInput: event.target.value
        });
    };

    render() {
        return (
            <header>
                <div className="hero">
                    <div className="heroContent">
                        <div className="innerBox">
                            <h1>DINE AND DASH</h1>
                            <form onSubmit={(event) => {
                                    event.preventDefault();
                                    if (this.state.userInput === '') {
                                        Swal.fire({
                                            confirmButtonColor: '#b20061',
                                            text: 'No location entered. Please enter a location.',
                                            icon: 'error'
                                        })
                                    } else {
                                        this.props.searchFunction(this.state.userInput)
                                        const headerRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
                                        window.scrollTo(0, headerRect.bottom)
                                    }
                                }
                                }>
                                    <label htmlFor="searchInput" className="visuallyHidden">Enter a location</label>
                                    <input type="text" name="searchInput" id="searchInput" onChange={this.handleChangeCityInput} placeholder="Enter your location" />
                                    <button type="submit">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="recommendationContainer">
                    <div className="restaurantRecommendation num1">
                        <div className="recommendationContent">
                            <div className="innerBox">
                                <p>Delicious and easy!</p>
                            </div>
                        </div>
                    </div>
                    <div className="restaurantRecommendation num2">
                        <div className="recommendationContent">
                            <div className="innerBox">
                                <p>Eat well and save time!</p>
                            </div>
                        </div>
                    </div>
                    <div className="restaurantRecommendation num3">
                        <div className="recommendationContent">
                            <div className="innerBox">
                                <p>Get out in one piece!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;