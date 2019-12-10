import React, { Component } from 'react';
// register fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false
        };
    }
    
    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function (e) {
            scrollComponent.toggleVisibility();
        });
    } 

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.setState({
                is_visible: true
            });
        } else {
            this.setState({
                is_visible: false
            });
        }
    }
    
    scrollToTop() {
        window.scrollTo(0, 0);
    }

    render() {
        const { is_visible } = this.state;
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
                {is_visible && (
                <button class="scrollToTop" onClick={this.scrollToTop}>
                    <FontAwesomeIcon icon={faChevronCircleUp} />
                </button>)}                
            </footer>
        )
    }
}

export default Footer;