import React, { Component } from "react";
import { TouchableOpacity, ImageBackground, FlatList, StyleSheet, Text, View } from 'react-native';
import images from '../../imagesPath'
export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parties: [],
      userVoted: false
    }
    this.voteParty = this.voteParty.bind(this);
    this.userVoted = this.userVoted.bind(this);
    this.beforeUserVote = this.beforeUserVote.bind(this);
  }
  componentDidMount() {
    fetch('https://isr-elections.herokuapp.com/api/parties')
      .then((responseParties) => responseParties.json())
      .then((jsonParties) => {
        this.setState({
          parties: jsonParties.parties
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  voteParty(partyToVote) {
    console.log(partyToVote)
    fetch(`https://isr-elections.herokuapp.com/api/parties/vote/${partyToVote}`, {
      method: 'POST'
    })
      .then(() => this.setState({ userVoted: true }))
      .catch((error) => {
        console.error(error)
      });
  }
  beforeUserVote() {
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={this.state.parties}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <TouchableOpacity flex={1} onPress={() => this.voteParty(item.id)}>
            <ImageBackground source={images[`${item.id}`]}
              style={styles.imageParty}
            >
              <Text style={styles.nameParty}>{item.id}</Text>
            </ImageBackground>
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
      />
    );
  }
  userVoted() {
    return (
      <View style={styles.userVotedContainer}>
        <Text style={styles.userVoted}>Thanks for your vote</Text>
      </View>
    )
  }
  render() {
    return (
      <View flex={1}>
        {this.state.userVoted ? this.userVoted() : this.beforeUserVote()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  party: {
    flex: 1,
    width: 200,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageParty: {
    flex: 1,
    width: 180,
    height: 180,
    alignItems: 'center',
  },
  nameParty: {
    fontSize: 20,
  },
  userVotedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userVoted: {
    color: 'green',
    fontSize: 50,
    textAlign: 'center',
  }
});