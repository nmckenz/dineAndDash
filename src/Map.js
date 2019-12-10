import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicGllcmNlbW9yYWxlcyIsImEiOiJjazN1YjAydTkwNmRvM2xtZWo3ZXI5cm44In0.mP0xBue4E9m2CEpDI-oQBA';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            map: {},
            mapLoaded: false,
        }
    }

    componentDidMount() {
        // Initialize the map
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
        });

        // save the initialized map
        this.setState({
            map:map
        })

        // when the map is loaded...
        map.on("load",() => {
            // Add a source for bike data
            map.addSource("bikes", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            })

            // Add a source for restaurant data
            map.addSource("restaurant", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            })

            // Add a source for route data
            map.addSource("route", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            })

            // Add a layer for restaurant data
            map.addLayer({
                id: "restaurant",
                type: "circle",
                source: "restaurant",
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#350482"
                }
            })

            // Add a layer for route data
            map.addLayer({
                id: 'route',
                type: 'line',
                source: "route",
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8
                }
            });

            // Add a layer for bike data (but load the bike image first)
            map.loadImage(
                "https://upload.wikimedia.org/wikipedia/en/e/e0/Cycling_hardtail_sil.gif",
                (error, image) => {
                    if (error) throw error;
                    map.addImage("bike", image);
                    map.addLayer({
                        id: "bikes",
                        type: "symbol",
                        source: "bikes",
                        layout: {
                        "icon-image": "bike",
                        "icon-size": 0.1
                        }
                    });
                    // The map is ready! Set state to say so
                    this.setState({
                        mapLoaded:true
                    })
                }
            );
        });
    }

    render() {

        // If the map has been loaded, we can start passing it some options
        if (this.state.mapLoaded) {
            // Restaurant is loaded. Add its marker to the map!
            if("coordinates" in this.props.restaurantDetails){
                    this.state.map.getSource("restaurant").setData({
                    type: "Point",
                    coordinates: [
                        this.props.restaurantDetails.coordinates.longitude,
                        this.props.restaurantDetails.coordinates.latitude
                    ]
                })
            }
            // Bike location is loaded. Add it to the map!
            if (this.props.bikeStations.length>0 && this.props.nearestBikeStation>=0){
                this.state.map.getSource("bikes").setData({
                    type: "Point",
                    coordinates: [
                        this.props.bikeStations[this.props.nearestBikeStation].longitude,
                        this.props.bikeStations[this.props.nearestBikeStation].latitude
                    ]
                })
            }

            // Have restaurant location. Zoom to fit it quickly
            if ("coordinates" in this.props.restaurantDetails) {
                // Fit restaurant location in the map
                const viewBox = [
                    [
                        this.props.restaurantDetails.coordinates.longitude - 0.0005,
                        this.props.restaurantDetails.coordinates.latitude - 0.0005
                    ],
                    [
                        this.props.restaurantDetails.coordinates.longitude + 0.0005,
                        this.props.restaurantDetails.coordinates.latitude + 0.0005
                    ]
                ]
                this.state.map.fitBounds(viewBox, {
                    padding: {top: 10, bottom: 10, left: 10, right: 10},
                    animate: false
                });


                // Bike and restaurant both loaded. Zoom to fit both.
                if (this.props.nearestBikeStation >= 0) {
                    const viewBox = [
                        [
                            this.props.restaurantDetails.coordinates.longitude,
                            this.props.restaurantDetails.coordinates.latitude
                        ],
                        [
                            this.props.bikeStations[this.props.nearestBikeStation].longitude,
                            this.props.bikeStations[this.props.nearestBikeStation].latitude
                        ]
                    ]
                    this.state.map.fitBounds(viewBox, {
                        padding: {top: 50, bottom: 50, left: 50, right: 50},
                    });
                }
            }

            //Waypoints are loaded. Draw route layer on map
            if (this.props.waypoints.length > 0) {
                this.state.map.getSource("route").setData({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: this.props.waypoints
                    }
                })
            }
        }

        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}

export default Map