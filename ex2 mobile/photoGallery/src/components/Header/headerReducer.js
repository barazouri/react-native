import { CHANGE_VISIBILITY, FAVORITE_CLICKED } from './headerActionType'

const initialState = {
  headerMode: false,
  favoritePage: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VISIBILITY:
      return {
        ...state,
        headerMode: action.data
      }
    case FAVORITE_CLICKED:
      return {
        ...state,
        favoritePage: action.data
      }
    default:
      return state
  }
}
