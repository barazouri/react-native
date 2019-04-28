import { IS_ZOOM, ADD_PHOTO_TO_FAVORITE, ZOOM_PHOTO } from './phothActionTypes'

const initialState = {
  favoritesPhotos: [],
  zoomInPhoto: false,
  photoToZoom: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTO_TO_FAVORITE:
      if (state.favoritesPhotos.filter(favorite => favorite.id === action.data.id).length === 0)
        return {
          ...state,
          favoritesPhotos: [...state.favoritesPhotos, action.data]
        }
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
