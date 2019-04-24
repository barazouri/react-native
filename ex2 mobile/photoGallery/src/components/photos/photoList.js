import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity,FlatList, Image, TextInput } from 'react-native'
import actions from './photoAction'



const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    paddingLeft:60,
    top:40,
    width: 360,
    borderWidth:1,
    backgroundColor: 'pink',
    alignItems: 'center'
  },
  favorite:{
    height: 35,
    width: 35
  },
  txt:{
    fontSize:30,
    paddingRight: 45
  },
  views:{
    borderWidth:1,
    marginTop:40,
    flexDirection: 'row',
    height:35,
    width:360,
    alignItems: 'center'
  },
  btn:{
    width:180,
  },
  image:{
    width:180,
    height:180,
    alignItems: 'center'
  },
  imageCointainer:{
    flex: 1,
   
  }
})

const mapStateToProps = ({ photo }) => {
  return {
    photos: photo.photos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setPhotosApi: (photos) => dispatch(actions.setPhotosApi(photos))
  }
}

export class photoList extends Component {
  constructor(props){
    super(props)
    this.openPhoto = this.openPhoto.bind(this)
  }
  componentDidMount() {
    fetch('https://pixabay.com/api/?key=12282704-3447f9dbaf38b2d325571cc19')
      .then(responseParties => responseParties.json())
      .then(jsonParties => {
        // photos=jsonParties.hits
        // this.setState({photos:jsonParties})
        this.props.setPhotosApi(jsonParties)
      })
      .catch(error => {
        console.log("error")
        throw new Error(error)
      })
  }
  openPhoto(){

  }
    render() {
      const{
        photos,
        setPhotosApi,
      }=this.props

      return(
          <View>
        <FlatList
        data={photos.hits}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.imageCointainer}>
          <TouchableOpacity onPress={this.openPhoto}>
            <Image style={styles.image} source={{uri:item.largeImageURL}}/>
          </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      </View>
      )
    }

} 

photoList.propTypes={
  photos:propTypes.object
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(photoList)
