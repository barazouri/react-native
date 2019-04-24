import { ZOOM_PHOTO, SET_LIKE, RETURN, SHOW_FAV, CHANGE_VIEW,SET_PHOTOS_API } from './phothActionTypes'

const zoomPhoto = id => ({ type: ZOOM_PHOTO, data: { id } })
const setLike = id => ({ type: SET_LIKE, data: { id } })
const Return = () => ({ type: RETURN })
const showFav = () => ({type:SHOW_FAV})
const setPhotosApi = kind => ({type:SET_PHOTOS_API, data:kind})
// const handleAddTodoSubmission = () => async dispatch => {
//   dispatch(changeInputVisibility())
// }

export default {
  setPhotosApi,
}