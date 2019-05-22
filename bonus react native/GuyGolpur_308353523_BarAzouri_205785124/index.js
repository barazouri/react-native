import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

class Application extends Component {
  render() {
    return <App />
  }
}
AppRegistry.registerComponent(appName, () => Application)
