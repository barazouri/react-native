import { IS_ZOOM, ADD_PHOTO_TO_FAVORITE, ZOOM_PHOTO } from './phothActionTypes'
// import { AsyncStorage } from 'react-native'

// var getFavoriteFromMemory = () => {
//   _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('@favorites');
//       if (value !== null) {
//         return(value)
//       }
//     } catch (error) {
//   }
// }
// }

const initialState = {
  favoritesPhotos: [],
  zoomInPhoto: false,
  photoToZoom: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTO_TO_FAVORITE:
      if (state.favoritesPhotos.filter(favorite => favorite.id === action.data.id).length === 0)
        state = {
          ...state,
          favoritesPhotos: [...state.favoritesPhotos, action.data]
        }
      // _storeData = async () => {
      //   try {
      //     await AsyncStorage.setItem('@favorites', state.favoritesPhotos)
      //   } catch (e) {
      //     // saving error
      //   }
      // }
      return state

    case ZOOM_PHOTO:
      return {
        ...state,
        zoomInPhoto: !state.zoomInPhoto,
        photoToZoom: action.data
      }
    case IS_ZOOM:
      return {
        ...state,
        zoomInPhoto: action.data
      }
    default:
      return state
  }
}
