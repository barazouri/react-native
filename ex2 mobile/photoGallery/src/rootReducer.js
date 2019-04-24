import { combineReducers } from 'redux'
import headerReducer from './components/Header/headerReducer'
import photosReducer from './components/photos/photoReducer'

export default combineReducers({
   header: headerReducer,
   photo:photosReducer,
})
