import React, { Component } from 'react';
import axios from 'axios';
import './partials/Footer.scss'

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <p>Copyright © 2019</p>
                </div>
            </footer>
        )
    }
}

export default Footer;