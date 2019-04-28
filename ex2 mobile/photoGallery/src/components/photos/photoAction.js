import { IS_ZOOM, ZOOM_PHOTO, ADD_PHOTO_TO_FAVORITE } from './phothActionTypes'

const addPhotoToFavorite = photo => ({ type: ADD_PHOTO_TO_FAVORITE, data: photo })
const zoomClickedPhoto = photo => ({ type: ZOOM_PHOTO, data: photo })
const isZoom = kind => ({ type: IS_ZOOM, data: kind })
export default {
  zoomClickedPhoto,
  addPhotoToFavorite,
  isZoom
}
