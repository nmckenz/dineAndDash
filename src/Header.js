import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
                                    this.props.searchFunction(this.state.userInput)
                                    const headerRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
                                    window.scrollTo(0,headerRect.bottom)
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
                        {/* <p>restaurant #1</p> */}
                        {/* <img src={require("./assets/restaurantRecommendation1Placeholder.jpg")} alt=""/> */}
                        <div className="recommendationContent">
                            <div className="innerBox">
                                <p>Lorem, ipsum.</p>
                            </div>
                        </div>
                    </div>
                    <div className="restaurantRecommendation num2">
                        {/* <p>restaurant #2</p> */}
                        {/* <img src={require("./assets/restaurantRecommendation2Placeholder.jpg")} alt="" /> */}
                        <div className="recommendationContent">
                            <div className="innerBox">
                                <p>Lorem, ipsum.</p>
                            </div>
                        </div>
                    </div>
                    <div className="restaurantRecommendation num3">
                        {/* <p>restaurant #3</p> */}
                        {/* <img src={require("./assets/restaurantRecommendation3Placeholder.jpg")} alt="" /> */}
                        <div className="recommendationContent">
                            <div className="innerBox">
                                <p>Lorem, ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;