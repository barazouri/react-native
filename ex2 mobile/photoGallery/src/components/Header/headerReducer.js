import {CHANGE_VISIBILITY} from './headerActionType'

const initialState = {
  headerMode: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VISIBILITY:
      return {
        headerMode: action.data
      }
    default:
      return state
  }
}
