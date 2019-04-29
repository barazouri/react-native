import { combineReducers } from 'redux'
import headerReducer from './components/Header/headerReducer'
import photosReducer from './components/photos/photoReducer'
import ListViewReducer from './components/ListView/ListViewReducer'
export default combineReducers({
  header: headerReducer,
  PhotoList: photosReducer,
  ListView: ListViewReducer
})
