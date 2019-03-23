import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header/Header';
import Vote from './components/Vote/Vote'
import TopRangParties from './components/TopRankParties/TopRankParties'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonStatus: false,
    }
    this.buttonPressed = this.buttonPressed.bind(this);
    this.votePage = this.votePage.bind(this);
    this.topRankPartiesPage = this.topRankPartiesPage.bind(this);
  }
  buttonPressed(ButtonStatus) {
    this.setState(
      { buttonStatus: ButtonStatus })
  }
  topRankPartiesPage() {
    return (
      <Fragment>
        <SafeAreaView style={styles.safeAreaTop} />
        <SafeAreaView style={styles.safeAreaBottom}>
          <Header buttonPressed={this.buttonPressed} />
          <TopRangParties />
        </SafeAreaView>
      </Fragment>
    )
  }
  votePage() {
    return (
      <Fragment>
        <SafeAreaView style={styles.safeAreaTop} />
        <SafeAreaView style={styles.safeAreaBottom}>
          <Header buttonPressed={this.buttonPressed} />
          <Vote></Vote>
        </SafeAreaView>
      </Fragment>
    );
  }
  render() {
    return (
      <View flex={1}>
        {this.state.buttonStatus ? this.topRankPartiesPage() : this.votePage()}
      </View>
    )
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
})

