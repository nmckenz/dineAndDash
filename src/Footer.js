import React, { Component } from 'react';
// register fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }
    
    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function (event) {
            scrollComponent.toggleVisibility();
        });
    } 

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.setState({
                isVisible: true
            });
        } else {
            this.setState({
                isVisible: false
            });
        }
    }
    
    scrollToTop() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <footer>
                <div className="wrapper">
                    <p>2019 © Made by 
                        <a href="http://laurenhetherington.com/" target="_blank" rel="noopener noreferrer"> Lauren</a>,
                        <a href="http://nicholasmckenzie.com/" target="_blank" rel="noopener noreferrer"> Nick</a>, 
                        <a href="http://annattran.com/" target="_blank" rel="noopener noreferrer"> Anna</a>, 
                        <a href="https://piercemorales.com/" target="_blank" rel="noopener noreferrer"> Pierce</a>
                    </p>
                </div>
                {(this.state.isVisible) ?
                <button className="navButton scrollToTop" onClick={this.scrollToTop}>
                    <FontAwesomeIcon icon={faChevronCircleUp} />
                </button> : null}       
            </footer>
        )
    }
}

export default Footer;