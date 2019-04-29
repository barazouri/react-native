import { SET_PHOTOS_API, LOADING_CHANGED, SET_KEYBOARD_VALUE } from './ListViewActionsTypes'

const initialState = {
  loading: false,
  photos: [],
  keyBoardValue: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CHANGED:
      return {
        ...state,
        loading: action.data
      }
    case SET_PHOTOS_API:
      return {
        ...state,
        photos: action.data
      }
    case SET_KEYBOARD_VALUE:
      return {
        ...state,
        keyBoardValue: action.data
      }
    default:
      return state
  }
}
