import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import headerActions from './headerActions'
import photoActions from '../photos/photoAction'
const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: 'row',
    paddingLeft: 30,
    top: 40,
    width: '100%',
    borderWidth: 1,
    backgroundColor: 'pink',
    alignItems: 'center'
  },
  favorite: {
    height: 35,
    width: 35
  },
  txt: {
    fontSize: 30,
    paddingLeft: 30
  },
  views: {
    borderWidth: 1,
    marginTop: 40,
    flexDirection: 'row',
    height: 35,
    width: '100%',
    alignItems: 'center'
  },
  btnGrid: {
    width: '50%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15
  },
  btnList: {
    width: '50%',
    justifyContent: 'center',
    height: 35,
    alignItems: 'center',
    fontSize: 15
  },
  containerBtnGrid: {
    flex: 1,
    alignItems: 'center'
  },
  containerBtnList: {
    flex: 1,
    alignItems: 'center'
  }
})
const mapStateToProps = ({ header, PhotoList }) => {
  return {
    headerMode: header.headerMode,
    favoritePage: header.favoritePage,
    zoomInPhoto: PhotoList.zoomInPhoto
  }
}
const mapDispatchToProps = dispatch => {
  return {
    favoriteClicked: status => dispatch(headerActions.favoriteClicked(status)),
    handleGrid: () => dispatch(headerActions.handleGrid()),
    handleList: () => dispatch(headerActions.handleList()),
    isZoom: kind => dispatch(photoActions.isZoom(kind))
  }
}
export class Header extends Component {
  constructor(props) {
    super(props)
    this.handleButtonLikeClicked = this.handleButtonLikeClicked.bind(this)
    this.handleButtonBackClicked = this.handleButtonBackClicked.bind(this)
  }
  handleButtonLikeClicked() {
    const { favoriteClicked } = this.props
    // isZoom(false)
    favoriteClicked(true)
  }
  handleButtonBackClicked() {
    const { isZoom, favoriteClicked } = this.props
    isZoom(false)
    favoriteClicked(false)
  }
  render() {
    const { headerMode, favoritePage, handleGrid, handleList, zoomInPhoto } = this.props
    return (
      <View>
        <View style={styles.header}>
          {!zoomInPhoto && !favoritePage && (
            <TouchableOpacity onPress={this.handleButtonLikeClicked}>
              <Image style={styles.favorite} source={require('../../images/like.png')} />
            </TouchableOpacity>
          )}
          {(favoritePage || zoomInPhoto) && (
            <TouchableOpacity onPress={this.handleButtonBackClicked}>
              <Image style={styles.favorite} source={require('../../images/left-arrow.png')} />
            </TouchableOpacity>
          )}
          <Text style={styles.txt}>Images Browser</Text>
        </View>

        <View style={styles.views}>
          <View style={styles.containerBtnGrid} backgroundColor={headerMode ? 'blue' : 'white'}>
            <TouchableOpacity backgroundColor={'blue'} style={styles.btnGrid} onPress={handleGrid}>
              <Text>Grid View</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerBtnList} backgroundColor={headerMode ? 'white' : 'blue'}>
            <TouchableOpacity style={styles.btnList} onPress={handleList}>
              <Text>List View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
Header.propTypes = {
  headerMode: propTypes.bool,
  favoritePage: propTypes.bool,
  zoomInPhoto: propTypes.bool,
  isZoom: propTypes.func,
  favoriteClicked: propTypes.func,
  handleGrid: propTypes.func,
  handleList: propTypes.func
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
