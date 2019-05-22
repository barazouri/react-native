import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { accelerometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors'

setUpdateIntervalForType(SensorTypes.accelerometer, 100)

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

export default class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {}
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
    this._subscription = accelerometer.subscribe(accelerometerData => {
      this.setState({ accelerometerData })
    })
  }

  _unsubscribe() {
    this._subscription.unsubscribe()
  }

  render() {
    const { x, y, z } = this.state.accelerometerData

    return (
      <View style={styles.sensor}>
        <Text style={styles.values}>Accelerometer:</Text>
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
