import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './src/components/Header/header'
import PhotoList from './src/components/photos/photoList'
import ListView from './src/components/ListView/listView'
import propTypes from 'prop-types'
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
    const { headerMode } = this.props
    return (
      <View style={styles.appContainer}>
        <Header />
        {headerMode ? <PhotoList /> : <ListView />}
      </View>
    )
  }
}
App.propTypes = {
  headerMode: propTypes.bool
}
export default connect(mapStateToProps)(App)
