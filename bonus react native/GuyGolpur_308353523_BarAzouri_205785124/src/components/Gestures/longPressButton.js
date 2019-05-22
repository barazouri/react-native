import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 30
  },
  longOrShortText: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class LongPressButton extends Component {
  constructor(props) {
    super(props)
    this.handleLongPress = this.handleLongPress.bind(this)
    this.handleShortPress = this.handleShortPress.bind(this)
    this.state = {
      longOrShort: null
    }
  }
  handleLongPress() {
    this.setState({ longOrShort: 'long press' })
  }
  handleShortPress() {
    this.setState({ longOrShort: 'short press' })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onLongPress={this.handleLongPress}
          onPress={this.handleShortPress}
        >
          <Text style={styles.buttonText}>Long tap</Text>
        </TouchableOpacity>
        <Text style={styles.longOrShortText}>{this.state.longOrShort}</Text>
      </View>
    )
  }
}
