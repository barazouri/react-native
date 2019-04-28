import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, FlatList, Image, Text, TextInput } from 'react-native'
import photoActions from './photoAction'
import headerAction from '../Header/headerActions'
import ListViewActions from '../ListView/ListViewActions'

const styles = StyleSheet.create({
  gridContainer: {
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90,
    alignItems: 'center'
  },
  imageZoom: {
    width: 300,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  likePhoto: {
    width: 50,
    height: 50,
    marginTop: 20
  },
  zoomPageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyArrayText: {
    // width: 360,
    marginTop: 30,
    fontSize: 40,
    textAlign: 'center'
  },
  favorite: {
    height: 35,
    width: 35
  },
  inputStyle: {
    // flex: 1,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%'
  },
  photoContainer: {
    width: '100%'
  }
})

const mapStateToProps = ({ photo, header, ListView }) => {
  return {
    favoritePage: header.favoritePage,
    headerMode: header.headerMode,
    photos: ListView.photos,
    zoomInPhoto: photo.zoomInPhoto,
    photoToZoom: photo.photoToZoom,
    favoritesPhotos: photo.favoritesPhotos,
    arrayholder: ListView.arrayholder,
    keyBoardValue: ListView.keyBoardValue
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addPhotoToFavorite: photo => dispatch(photoActions.addPhotoToFavorite(photo)),
    zoomClickedPhoto: photo => dispatch(photoActions.zoomClickedPhoto(photo)),
    favoriteClicked: status => dispatch(headerAction.favoriteClicked(status)),
    isZoom: kind => dispatch(photoActions.isZoom(kind)),
    setPhotosApi: photos => dispatch(ListViewActions.setPhotosApi(photos)),
    setKeyboardValue: value => dispatch(ListViewActions.setKeyboardValue(value))
  }
}

export class PhotoList extends Component {
  constructor(props) {
    super(props)
    this.renderGrid = this.renderGrid.bind(this)
    this.zoomPhoto = this.zoomPhoto.bind(this)
    this.emptyListMessage = this.emptyListMessage.bind(this)
    this.handleButtonBackClicked = this.handleButtonBackClicked.bind(this)
    this.renderSearchInput = this.renderSearchInput.bind(this)
    this.searchFilterFunction = this.searchFilterFunction.bind(this)
  }
  emptyListMessage() {
    return <Text style={styles.emptyArrayText}>No Result Were Found</Text>
  }
  handleButtonBackClicked() {
    const { isZoom } = this.props
    isZoom(false)
  }
  searchFilterFunction(text) {
    const { arrayholder, setPhotosApi, setKeyboardValue } = this.props
    setKeyboardValue(text)
    const newData = arrayholder.filter(item => {
      const itemData = `${item.tags.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    setPhotosApi(newData)
  }
  renderSearchInput() {
    const { keyBoardValue, favoritePage } = this.props
    if (!favoritePage) {
      return (
        <View>
          <TextInput
            placeholder="Type Here..."
            style={styles.inputStyle}
            onChangeText={text => this.searchFilterFunction(text)}
            value={keyBoardValue}
          />
        </View>
      )
    }
    return <View />
  }
  zoomPhoto() {
    const { favoritePage, photoToZoom, addPhotoToFavorite } = this.props
    return (
      <View>
        {favoritePage && (
          <TouchableOpacity onPress={this.handleButtonBackClicked}>
            <Image style={styles.favorite} source={require('../../images/left-arrow.png')} />
          </TouchableOpacity>
        )}
        <View style={styles.zoomPageContainer}>
          <Image style={styles.imageZoom} source={{ uri: photoToZoom.webformatURL }} />
          <TouchableOpacity onPress={() => addPhotoToFavorite(photoToZoom)}>
            {!favoritePage && (
              <Image style={styles.likePhoto} source={require('../../images/like.png')} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  renderGrid() {
    const { photos, headerMode, zoomClickedPhoto, favoritePage, favoritesPhotos } = this.props
    return (
      <View style={styles.photoContainer}>
        {headerMode && (
          <FlatList
            data={favoritePage ? favoritesPhotos : photos}
            numColumns={4}
            ListEmptyComponent={this.emptyListMessage}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => zoomClickedPhoto(item)}>
                <Image style={styles.image} source={{ uri: item.largeImageURL }} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderSearchInput}
            onEndThreshold={0}
          />
        )}
      </View>
    )
  }
  render() {
    const { zoomInPhoto } = this.props
    return (
      <View style={styles.gridContainer}>{zoomInPhoto ? this.zoomPhoto() : this.renderGrid()}</View>
    )
  }
}

PhotoList.propTypes = {
  headerMode: propTypes.bool,
  favoritePage: propTypes.bool,
  zoomInPhoto: propTypes.bool,
  keyBoardValue: propTypes.string,
  favoritesPhotos: propTypes.array,
  photos: propTypes.array,
  arrayholder: propTypes.array,
  photoToZoom: propTypes.object,
  addPhotoToFavorite: propTypes.func,
  zoomClickedPhoto: propTypes.func,
  isZoom: propTypes.func,
  setPhotosApi: propTypes.func,
  setKeyboardValue: propTypes.func
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList)
