import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Header from './src/components/Header/header'
import PhotoList from './src/components/photos/photoList'
export default class App extends Component {
  render() {
    return(
    <View>
      <Header/>
      <PhotoList/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
});
