import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import ListViewActions from './ListViewActions'
const styles = StyleSheet.create({
  emptyArrayText: {
    marginTop: 30,
    fontSize: 40,
    textAlign: 'center'
  },
  container: {
    flexDirection: 'row',
    height: 105
  },
  content: {
    flex: 1,
    flexDirection: 'column'
  },
  picTitle: {
    top: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'column',
    flex: 2
  },
  picName: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  seperator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%'
  },
  loading: {
    flex: 1,
    top: 160,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ ListView, header, PhotoList }) => {
  return {
    loading: ListView.loading,
    keyBoardValue: ListView.keyBoardValue,
    photos: ListView.photos,
    favoritePage: header.favoritePage,
    favoritesPhotos: PhotoList.favoritesPhotos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeLoading: status => dispatch(ListViewActions.changeLoading(status)),
    setKeyboardValue: value => dispatch(ListViewActions.setKeyboardValue(value)),
    setPhotosApi: photos => dispatch(ListViewActions.setPhotosApi(photos))
  }
}

export class ListView extends Component {
  constructor(props) {
    super(props)
    this.emptyListMessage = this.emptyListMessage.bind(this)
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
    this.searchFilterFunction = this.searchFilterFunction.bind(this)
    this.handleSearchByEnter = this.handleSearchByEnter.bind(this)
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  async makeRemoteRequest() {
    const { changeLoading, setPhotosApi, keyBoardValue } = await this.props
    const url = `https://pixabay.com/api/?key=12282704-3447f9dbaf38b2d325571cc19&q=${keyBoardValue}&image_type=photo`
    changeLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(photosJson => {
        setPhotosApi(photosJson.hits)
        changeLoading(false)
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  renderSeparator() {
    return <View style={styles.seperator} />
  }
  searchFilterFunction(text) {
    const { setKeyboardValue } = this.props
    setKeyboardValue(text)
  }
  handleSearchByEnter() {
    this.makeRemoteRequest()
  }

  emptyListMessage() {
    return <Text style={styles.emptyArrayText}>No Result were found</Text>
  }

  render() {
    const { favoritesPhotos, loading, photos, favoritePage } = this.props
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View>
        <FlatList
          data={favoritePage ? favoritesPhotos : photos}
          ListEmptyComponent={this.emptyListMessage}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Image style={styles.image} source={{ uri: item.largeImageURL }} />
              <View style={styles.content}>
                <Text style={styles.picTitle}>
                  {item.tags}
                  {'\n'}
                </Text>
                <Text style={styles.picName}>
                  Views: {item.views} Likes: {item.likes}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}
ListView.propTypes = {
  setKeyboardValue: propTypes.func,
  photos: propTypes.array,
  loading: propTypes.bool,
  favoritePage: propTypes.bool,
  favoritesPhotos: propTypes.array
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView)
