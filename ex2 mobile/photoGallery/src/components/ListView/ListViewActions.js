import {
  LOADING_CHANGED,
  SET_KEYBOARD_VALUE,
  SET_PHOTOS_API,
  SET_ARRAY_HOLDER
} from './ListViewActionsTypes'

const changeLoading = kind => ({ type: LOADING_CHANGED, data: kind })
const setPhotosApi = allPhotos => ({ type: SET_PHOTOS_API, data: allPhotos })
const setKeyboardValue = value => ({ type: SET_KEYBOARD_VALUE, data: value })
const setArrayHolder = value => ({ type: SET_ARRAY_HOLDER, data: value })

export default {
  changeLoading,
  setPhotosApi,
  setKeyboardValue,
  setArrayHolder
}
