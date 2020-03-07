import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import Header from './HeaderComponent'
import HouseCard from './HouseCardComponent'
import { SCREENS } from '../common/Constants';

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
            ],
            activeStore: {},
            showingInfoWindow: true,
            selectedPlace: {},
            city: {}
        }
    }


    onMapClicked = () => {
        console.log('onMapClicked')
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeStore: null
            })
        }
    }

    centerMoved = (data) => {
        console.log('centerMoved', data)
    }

    onMouseoverCity = (index) => {
        console.log('onMouseoverCity', index)
    }

    onClickCity = (item) => {
        console.log('onClickCity', item)
        this.setState({
            selectedPlace: item,
            activeStore:item,
            showingInfoWindow: true
        });
    }
    displayMarkers = () => {
        return this.props.maplist ? this.props.maplist.map((city, index) => {
            return <Marker key={index} id={index} position={{
                lat: city.latitude,
                lng: city.longitude
            }}
                name={city.name}
                onClick={() => this.onClickCity(city)}
                onMouseover={() => this.onMouseoverCity(index)}
                icon="https://www.holidayhouses.co.nz/ReactApp/images/search/house_marker.png"
            />
        }) : <div></div>;
    }
    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    render() {

        return (
            <div className="map-base">
                <div className="map-div">
                    <Map
                        google={this.props.google}
                        zoom={7}
                        // center={this.props.maplist.length>0?{'lat':this.props.maplist[0].latitude,'lan':this.props.maplist[0].lan}:null}
                        style={mapStyles}
                        onDragend={this.centerMoved}
                        onClick={this.onMapClicked}
                    >
                        {this.displayMarkers()}
                        <InfoWindow
                            options={{
                                alignBottom: true,
                                pane: 'mapPane',
                                boxStyle: {
                                    width: '300px'
                                },
                                enableEventPropagation: true
                            }}
                            // marker={this.state.activeStore}
                            visible={this.state.showingInfoWindow}>
                            <div style={{
                                maxWidth: 350,
                                maxHeight: 350
                            }}>
                                <HouseCard data={this.state.selectedPlace} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAtrjoskEoY3e9MZsBWD3DVlXa-k5XCQqU"
})(MapComponent);