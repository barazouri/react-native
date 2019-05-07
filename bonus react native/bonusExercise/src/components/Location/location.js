import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView from 'react-native-maps'

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  positionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      where: { lat: 0, lng: 0 },
      error: null
    }
    this.geoSuccess = this.geoSuccess.bind(this)
    this.geoFailure = this.geoFailure.bind(this)
  }
  componentDidMount() {
    const geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60
    }
    this.setState({ ready: false, error: null })
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions)
  }
  geoSuccess(position) {
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude }
    })
  }
  geoFailure(err) {
    this.setState({ error: err.message })
  }
  render() {
    return (
      <MapView
        style={styles.map}
        showsUserLocation
        region={{
          latitude: this.state.where.lat,
          latitudeDelta: 0.1,
          longitude: this.state.where.lng,
          longitudeDelta: 0.1
        }}
        followsUserLocation
      >
        <MapView.Marker
          coordinate={{ latitude: this.state.where.lat, longitude: this.state.where.lng }}
        />

        {this.state.ready && (
          <View style={styles.positionContainer}>
            <Text>Latitude: {this.state.where.lat}</Text>
            <Text>Longtitude: {this.state.where.lng}</Text>
            {this.state.error && <Text>{this.state.err}</Text>}
          </View>
        )}
      </MapView>
    )
  }
}
