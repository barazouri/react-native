import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from './headerActions'

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: 'row',
    paddingLeft: 60,
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
    paddingRight: 45
  },
  views: {
    borderWidth: 1,
    marginTop: 40,
    flexDirection: 'row',
    height: 35,
    width: '100%',
    alignItems: 'center',
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
    alignItems: 'center',

  },
  containerBtnList: {
    flex: 1,
    alignItems: 'center',

  }
})

const mapStateToProps = ({ header }) => {
  return {
    headerMode: header.headerMode
  }
}
export class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      headerMode,
      handleGrid,
      handleList
    } = this.props
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.txt}>Images Browser</Text>
          <TouchableOpacity><Image style={styles.favorite} source={require('../../images/like.png')}></Image></TouchableOpacity>
        </View>
       
        <View style={styles.views}>
          <View style={styles.containerBtnGrid} backgroundColor={headerMode ? 'blue' : 'white'}>
            <TouchableOpacity backgroundColor={'blue'} style={styles.btnGrid} onPress={handleGrid}><Text >Grid View</Text></TouchableOpacity>
          </View>
          <View style={styles.containerBtnList} backgroundColor={headerMode ? 'white' : 'blue'}>
            <TouchableOpacity style={styles.btnList} onPress={handleList} ><Text >List View</Text></TouchableOpacity>
          </View>
        </View>
        {!headerMode && (
          <View>
            <TextInput
              placeholder="Type here to translate!"
            />
          </View>
        )}
        {headerMode && (
          <View>
            <TextInput
              placeholder="LIST"
            />
          </View>
        )
        }
      </View>
    )
  }
}
Header.propTypes = {
  headerMode: PropTypes.bool
}
export default connect(
  mapStateToProps,
  actions
)(Header)