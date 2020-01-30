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
    }

    onClickCity = (city) => {
        console.log('city details', city)
    }

    centerMoved = (data) => {
        console.log('centerMoved', data)
    }

    displayMarkers = () => {
        return this.state.stores.map((city, index) => {
            return <Marker key={index} id={index} position={{
                lat: city.latitude,
                lng: city.longitude
            }}
                onClick={() => this.onClickCity(city)} />
        })
    }

    render() {

        return (
            <div className="map-base">
                <Header />
                <div className="content-div">
                    <div className="list-div">

                    </div>
                    <div className="map-div">
                        <Map
                            google={this.props.google}
                            zoom={7}
                            style={mapStyles}
                            initialCenter={{ lat: 11.127123, lng: 78.656891 }}
                            onDragend={this.centerMoved}
                        >
                            {this.displayMarkers()}
                        </Map>
                    </div>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBuJnGEpeJlW8w0CV0htUt3ZpEMW6eL1_M"
})(MapComponent);