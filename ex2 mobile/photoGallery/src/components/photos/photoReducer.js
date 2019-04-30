import { IS_ZOOM, ADD_PHOTO_TO_FAVORITE, ZOOM_PHOTO } from './phothActionTypes'
// import { AsyncStorage } from 'react-native'
// const retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@favorites')
//     if (value !== null) {
//       console.log(value)
//       return value
//     }
//     return []
//   } catch (error) {
//     // Error retrieving data
//   }
// }
// const _storeData = async favoritesPhotos => {
//   try {
//     await AsyncStorage.setItem('@favorites', JSON.stringify(favoritesPhotos))
//   } catch (error) {
//     // Error saving data
//   }
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
      // console.log(state.favoritesPhotos)
      // _storeData(state.favoritesPhotos)
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
