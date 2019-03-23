import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, View,Image } from 'react-native';
import images from '../../imagesPath'
export default class TopRankParties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalNumberOfVotes: 0,
      Top5RankParties: []
    }
  }
  async componentDidMount() {
    try {
      responseParties = await fetch('https://isr-elections.herokuapp.com/api/parties')
      jsonParties = await responseParties.json()
      responsePartiesRank = await fetch('https://isr-elections.herokuapp.com/api/parties/poll-status')
      jsonPartiesRank = await responsePartiesRank.json()
      tempAllPartiesRank = []
      totalNumberOfVotes = 0
      for (party of jsonParties.parties) {
        tempAllPartiesRank.push({ party: party.id, voteNumber: jsonPartiesRank[`${party.id}`].currentVotes })
        totalNumberOfVotes += jsonPartiesRank[`${party.id}`].currentVotes
      }
      tempAllPartiesRank.sort((a, b) => b.voteNumber - a.voteNumber)
      tempTop5 = []
      for (let i = 0; i < 5; i++) {
        tempTop5.push(tempAllPartiesRank[i])
      }
      this.setState({ Top5RankParties: tempTop5, totalNumberOfVotes: totalNumberOfVotes })
    }
    catch (error) {
      console.error(error)
    }
  }
  render() {
    return (
      <View flex={1}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={this.state.Top5RankParties}
          renderItem={({ item }) =>
          <View style={styles.partyContainer}>
          <Image style={styles.partyImage}
           source={images[`${item.party}`]}
           />
            <View style={styles.partyContent}>
              <Text style={styles.partyName}>{item.party}</Text>
              <Text>votes: {Number.parseFloat((item.voteNumber / this.state.totalNumberOfVotes) * 100).toFixed(2)}%</Text>
            </View>
            </View>}
          keyExtractor={(item) => item.party}
        >
        </FlatList>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  partyContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  partyContent: {
    flex: 1,
    flexDirection: 'column',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partyName: {
    fontSize: 30,
  },
  partyImage:{
    width:100,
    height:100,
  }
})