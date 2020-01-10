import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import Header from './HeaderComponent'

const mapStyles = {
    width: '100%',
    height: '100%',
};


class MapComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stores: [
                { lat: 11.127123, lng: 78.656891 },
                { latitude: 10.010366, longitude: 77.476814, name: "Theni" },
                { latitude: 11.004556, longitude: 76.961632, name: "Coimbatore" },
                { latitude: 9.939093, longitude: 78.121719, name: "Maduari" },
                { latitude: 10.8155, longitude: 78.6965, name: "Tiruchirapalli" },
                { latitude: 13.067439, longitude: 80.237617, name: "Chennai" },
            ]
        }
        console.log('map props', props)
    }

    displayMarkers = () => {
        return this.state.stores.map((city, index) => {
            return <Marker key={index} id={index} position={{
                lat: city.latitude,
                lng: city.longitude
            }}
                onClick={() => alert("You clicked! ", city.name)} />
        })
    }

    render() {

        return (
            <div className="map-base">
                <Header />
                <Map
                    google={this.props.google}
                    zoom={7}
                    style={mapStyles}
                    initialCenter={{ lat: 11.127123, lng: 78.656891 }}
                >
                    {this.displayMarkers()}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ""
})(MapComponent);