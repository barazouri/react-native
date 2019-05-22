import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { gyroscope, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors'

setUpdateIntervalForType(SensorTypes.gyroscope, 100)

const styles = StyleSheet.create({
  values: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  sensor: {
    marginTop: 105,
    paddingHorizontal: 10
  }
})

export default class GyroscopeSensor extends React.Component {
  state = {
    gyroscopeData: {}
  }

  componentDidMount() {
    this.handleToggle()
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  handleToggle() {
    if (this._subscription) {
      this._unsubscribe()
    } else {
      this._subscribe()
    }
  }

  _subscribe() {
    this._subscription = gyroscope.subscribe(gyroscopeData => {
      this.setState({ gyroscopeData })
    })
  }

  _unsubscribe() {
    this._subscription.unsubscribe()
  }

  render() {
    const { x, y, z } = this.state.gyroscopeData

    return (
      <View style={styles.sensor}>
        <Text style={styles.values}>Gyroscope:</Text>
        <Text style={styles.values}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
      </View>
    )
  }
}

function round(n) {
  if (!n) {
    return 0
  }
  return Math.floor(n * 100) / 100
}
