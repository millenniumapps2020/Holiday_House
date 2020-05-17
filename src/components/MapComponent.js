import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import HouseCardComponent from './HouseCardComponent'
import { SCREENS } from '../common/Constants';

const mapStyles = {
    width: '100%',
    height: '100%',
};


class MapComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStore: {},
            showingInfoWindow: true,
            selectedPlace: {},
            city: {},
            coordinates: {}
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

    onClickCity = (props, marker, e) => {
        if (!this.props.name == "detailsComponent") {
            this.setState({
                selectedPlace: props,
                activeStore: marker,
                showingInfoWindow: true,
            });
        }

    }
    displayMarkers = () => {
        return this.props.maplist ? this.props.maplist.map((city, index) => {
            return <Marker key={index} id={index} position={{
                lat: city.latitude,
                lng: city.longitude
            }}
                name={city.name}
                onClick={this.onClickCity}
                // onMouseover={() => this.onMouseoverCity(index)}
                icon="https://www.holidayhouses.co.nz/ReactApp/images/search/house_marker.png"
            />
        }) : <div></div>;
    }
    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    render() {
        var coordinates = this.props.maplist ? { lat: this.props.maplist[0].latitude, lng: this.props.maplist[0].longitude } : {}
        return (

            <div className="map-base" style={this.props.name == "detailsComponent" ? { marginTop: 30, height:'300!important', } : null}>
                <div className="map-div">
                    {Object.keys(coordinates).length > 0 ?
                        <Map
                            className={this.props.name == "detailsComponent" ? 'mapV2' : 'map'}
                            google={this.props.google}
                            center={coordinates}
                            zoom={10}
                            initialCenter={coordinates}
                            style={mapStyles}
                            // onDragend={this.centerMoved}
                            onClick={this.onMapClicked}
                        >
                            {this.displayMarkers()}
                            <InfoWindow
                                options={{
                                    closeBoxURL: '',
                                    enableEventPropagation: true,
                                }}
                                style={{
                                    width: '320px!important',
                                    height: '320px!important',
                                    padding: '0px!important'
                                }}
                                marker={this.state.activeStore}
                                visible={this.state.showingInfoWindow}
                                onOpen={(e) => {
                                    const _houseCardComponent = <HouseCardComponent name="mapComponent" data={this.props.maplist[this.state.selectedPlace.id]} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                                    ReactDOM.render(
                                        React.Children.only(_houseCardComponent),
                                        document.getElementById("infoWindowHouseCard")
                                    );
                                }}
                            >
                                <div id="infoWindowHouseCard" />
                            </InfoWindow>
                        </Map> : null
                    }
                </div>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAtrjoskEoY3e9MZsBWD3DVlXa-k5XCQqU"
})(MapComponent);