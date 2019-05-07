import React, { Component } from 'react'
import { StyleSheet, View, Animated, PanResponder } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40
  },
  animatedView: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'blue'
  }
})

export default class Drag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    }
    this.initResponder = this.initResponder.bind(this)
    this.panResponder = this.initResponder()
  }

  initResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderRelease: () => {
        this.state.pan.flattenOffset()
      }
    })
  }
  render() {
    const { pan } = this.state
    const [translateX, translateY] = [pan.x, pan.y]
    const circleStyle = { transform: [{ translateX }, { translateY }] }
    return (
      <View style={styles.container}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.animatedView, circleStyle]}
        />
      </View>
    )
  }
}
