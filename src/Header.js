import React, { Component } from 'react';

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
            <div>
                <div className="hero">
                    <div className="heroContent">
                        <h1>DINE AND DASH</h1>
                        <fieldset>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                this.props.searchFunction(this.state.userInput)
                            }
                            }>
                                <input type="text" onChange={this.handleChangeCityInput} placeholder="Enter a city" />
                                <button type="submit">submit</button>
                            </form>
                        </fieldset>
                    </div>
                </div>
                <div className="restaurantRecommendation">
                    {/* <p>restaurant #1</p> */}
                    <img src={require("./assets/restaurantRecommendation1Placeholder.jpg")} alt=""/>
                </div>
                <div className="restaurantRecommendation">
                    {/* <p>restaurant #2</p> */}
                    <img src={require("./assets/restaurantRecommendation2Placeholder.jpg")} alt="" />
                </div>
                <div className="restaurantRecommendation">
                    {/* <p>restaurant #3</p> */}
                    <img src={require("./assets/restaurantRecommendation3Placeholder.jpg")} alt="" />
                </div>
            </div>
        )
    }
}

export default Header;