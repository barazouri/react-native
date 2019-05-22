import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Tabbar from 'react-native-tabbar-bottom'
import Drag from '../Gestures/drag'
import Location from '../Location/location'
import LongPressButton from '../Gestures/longPressButton'
import Swipe from '../Gestures/swipe'
import GyroscopeSensor from '../Gyroscope/gyroscope'
import AccelerometerSensor from '../Accelerometer/accelerometer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      page: 'Location'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.page === 'Location' && <Location />}
        {this.state.page === 'Drag' && <Drag />}
        {this.state.page === 'LongPressButton' && <LongPressButton />}
        {this.state.page === 'Swipe' && <Swipe />}
        {this.state.page === 'Gyroscope' && <GyroscopeSensor />}
        {this.state.page === 'Accelerometer' && <AccelerometerSensor />}

        <Tabbar
          stateFunc={tab => {
            this.setState({ page: tab.page })
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: 'Location',
              icon: 'locate'
            },
            {
              page: 'Drag',
              icon: 'tennisball'
            },
            {
              page: 'LongPressButton',
              icon: 'radio-button-on'
            },
            {
              page: 'Swipe',
              icon: 'swap'
            },
            {
              page: 'Gyroscope',
              icon: 'tablet-landscape'
            },
            {
              page: 'Accelerometer',
              icon: 'thermometer'
            }
          ]}
        />
      </View>
    )
  }
}
