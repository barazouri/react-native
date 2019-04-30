import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native'
import photoActions from './photoAction'
import headerAction from '../Header/headerActions'
import ListViewActions from '../ListView/ListViewActions'
import ListView from '../ListView/listView'

const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('@favorites')
    if (value !== null) {
      const favorites = JSON.parse(value)
      return favorites
    }
    return []
  } catch (error) {
    throw new Error(error)
  }
}
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
    marginTop: 30,
    fontSize: 40,
    textAlign: 'center'
  },
  favorite: {
    height: 35,
    width: 35
  },
  inputStyle: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%'
  },
  photoContainer: {
    width: '100%'
  }
})

const mapStateToProps = ({ PhotoList, header, ListView }) => {
  return {
    favoritePage: header.favoritePage,
    headerMode: header.headerMode,
    photos: ListView.photos,
    keyBoardValue: ListView.keyBoardValue,
    zoomInPhoto: PhotoList.zoomInPhoto,
    photoToZoom: PhotoList.photoToZoom,
    favoritesPhotos: PhotoList.favoritesPhotos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addPhotoToFavorite: photo => dispatch(photoActions.addPhotoToFavorite(photo)),
    zoomClickedPhoto: photo => dispatch(photoActions.zoomClickedPhoto(photo)),
    favoriteClicked: status => dispatch(headerAction.favoriteClicked(status)),
    isZoom: kind => dispatch(photoActions.isZoom(kind)),
    setPhotosApi: photos => dispatch(ListViewActions.setPhotosApi(photos)),
    setKeyboardValue: value => dispatch(ListViewActions.setKeyboardValue(value)),
    changeLoading: status => dispatch(ListViewActions.changeLoading(status))
  }
}

export class PhotoList extends Component {
  constructor(props) {
    super(props)
    this.renderGrid = this.renderGrid.bind(this)
    this.zoomPhoto = this.zoomPhoto.bind(this)
    this.emptyListMessage = this.emptyListMessage.bind(this)
    this.handleButtonBackClicked = this.handleButtonBackClicked.bind(this)
    this.searchFilterFunction = this.searchFilterFunction.bind(this)
    this.handleSearchByEnter = this.handleSearchByEnter.bind(this)
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this)
  }
  async componentDidMount() {
    const { addPhotoToFavorite } = this.props
    const favorites = await retrieveData()
    for (const photo of favorites) {
      addPhotoToFavorite(photo)
    }
  }
  makeRemoteRequest() {
    const { changeLoading, setPhotosApi, keyBoardValue } = this.props
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
  emptyListMessage() {
    return <Text style={styles.emptyArrayText}>No Result Were Found</Text>
  }
  handleButtonBackClicked() {
    const { isZoom } = this.props
    isZoom(false)
  }
  handleSearchByEnter() {
    this.makeRemoteRequest()
  }
  searchFilterFunction(text) {
    const { setKeyboardValue } = this.props
    setKeyboardValue(text)
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
        <TextInput
          placeholder="Type Here..."
          style={styles.inputStyle}
          onChangeText={text => this.searchFilterFunction(text)}
          onEndEditing={this.handleSearchByEnter}
        />
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
            onEndThreshold={0}
          />
        )}
        {!headerMode && <ListView />}
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
  photoToZoom: propTypes.object,
  addPhotoToFavorite: propTypes.func,
  zoomClickedPhoto: propTypes.func,
  isZoom: propTypes.func,
  setPhotosApi: propTypes.func,
  setKeyboardValue: propTypes.func,
  changeLoading: propTypes.func
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList)
