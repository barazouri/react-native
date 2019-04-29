import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './src/components/Header/header'
import PhotoList from './src/components/photos/photoList'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
})
const mapStateToProps = ({ header }) => {
  return {
    headerMode: header.headerMode
  }
}
export class App extends Component {
  render() {
    // const { headerMode } = this.props
    return (
      <View style={styles.appContainer}>
        <Header />
        {/* {headerMode ? <PhotoList /> : <ListView />} */}
        <PhotoList />
      </View>
    )
  }
}
export default connect(mapStateToProps)(App)
