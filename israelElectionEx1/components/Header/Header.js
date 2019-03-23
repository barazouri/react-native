import React, { Component } from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonPressed: false,
    }
    this.handlePressButton = this.handlePressButton.bind(this);
  }
  handlePressButton() {
    this.props.buttonPressed(!this.state.buttonPressed)
    this.setState(previousState => (
      { buttonPressed: !previousState.buttonPressed })
    )
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>בחירות ישראל 2019</Text>
          <View style={styles.changePageButton}>
            <Button
              color='white'
              onPress={this.handlePressButton}
              title={this.state.buttonPressed ? 'Vote' : 'Status'}
            >
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: 'white'
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonStyle: {
    color: 'white',
    flexDirection: 'row'
  },
  header: {
    backgroundColor: 'pink',
    borderColor: 'red',
    borderWidth: 0.5,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 30,
    padding: 10,
  },
  changePageButton: {
    backgroundColor: '#00aeef',
    padding: 10,
    borderRadius: 15,
    width: 90,
  },
})