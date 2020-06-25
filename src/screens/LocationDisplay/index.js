import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


var watchLocationOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
        useSignificantChanges: false
};

function watchPosError(err) {
  alert('ERROR(' + err.code + '): ' + err.message);
}

class LocationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >My Current Position: </Text>
        <Text>{"Latitude: " + this.state.latitude}</Text>
        <Text>{"Longitude: " + this.state.longitude}</Text>
      </View>
    );
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      this.watchCurrentLocation();
    } else {
      alert("No geolocation possible.");
    }
  }

  watchCurrentLocation = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      let location = await navigator.geolocation.watchPosition(
        pos => {
          console.log("updating position: " + pos.coords.latitude + ", " +
                                              pos.coords.longitude);
          this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        }, watchPosError, watchLocationOptions);
    } else {
      alert("Can't access location, permission was denied.");
    }
  };
}

export default LocationDisplay;
