import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../src/rootReducer'
import headerActions from '../src/components/Header/headerActions'
import ListViewActions from '../src/components/ListView/ListViewActions'
import photoAction from '../src/components/photos/photoAction'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('redux e2e functionality', function() {
  test('check handleGrid and handleList function in headerAction', function() {
    //headerAction
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().header).toHaveProperty('headerMode', false)
    store.dispatch(headerActions.handleGrid())
    expect(store.getState().header).toHaveProperty('headerMode', true)
    store.dispatch(headerActions.handleList())
    expect(store.getState().header).toHaveProperty('headerMode', false)
  })
  test('check favoriteClicked function in headerAction', function() {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().header).toHaveProperty('favoritePage', false)
    store.dispatch(headerActions.favoriteClicked(true))
    expect(store.getState().header).toHaveProperty('favoritePage', true)
    store.dispatch(headerActions.favoriteClicked(false))
    expect(store.getState().header).toHaveProperty('favoritePage', false)
  })
  //ListViewActions
  test('check changeLoading function in ListViewActions', function() {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().ListView).toHaveProperty('loading', false)
    store.dispatch(ListViewActions.changeLoading(true))
    expect(store.getState().ListView).toHaveProperty('loading', true)
    store.dispatch(ListViewActions.changeLoading(false))
    expect(store.getState().ListView).toHaveProperty('loading', false)
  })
  test('check setPhotosApi function in ListViewActions', function() {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().ListView).toHaveProperty('photos', [])
    store.dispatch(
      ListViewActions.setPhotosApi({
        largeImageURL:
          'https://pixabay.com/get/ea37b50e2ff11c22d2524518b74d4494eb75e5d51dac104490f6c47da0eebdb9_1280.jpg',
        webformatHeight: 426
      })
    )
    expect(store.getState().ListView).toHaveProperty('photos', {
      largeImageURL:
        'https://pixabay.com/get/ea37b50e2ff11c22d2524518b74d4494eb75e5d51dac104490f6c47da0eebdb9_1280.jpg',
      webformatHeight: 426
    })
  })
  test('check setKeyboardValue function in ListViewActions', function() {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().ListView).toHaveProperty('keyBoardValue', '')
    store.dispatch(ListViewActions.setKeyboardValue('blablabla'))
    expect(store.getState().ListView).toHaveProperty('keyBoardValue', 'blablabla')
  })
  //photos
  test('check addPhotoToFavorite function in photos', function() {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().photo).toHaveProperty('favoritesPhotos', [])
    store.dispatch(
      photoAction.addPhotoToFavorite({
        largeImageURL:
          'https://pixabay.com/get/ea37b50e2ff11c22d2524518b74d4494eb75e5d51dac104490f6c47da0eebdb9_1280.jpg',
        webformatHeight: 426
      })
    )
    expect(store.getState().photo).toHaveProperty('favoritesPhotos', [
      {
        largeImageURL:
          'https://pixabay.com/get/ea37b50e2ff11c22d2524518b74d4494eb75e5d51dac104490f6c47da0eebdb9_1280.jpg',
        webformatHeight: 426
      }
    ])
  })
  test('check zoomClickedPhoto function in photos', function() {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().photo).toHaveProperty('photoToZoom', {})
    expect(store.getState().photo).toHaveProperty('zoomInPhoto', false)
    store.dispatch(
      photoAction.zoomClickedPhoto({
        largeImageURL:
          'https://pixabay.com/get/ea37b50e2ff11c22d2524518b74d4494eb75e5d51dac104490f6c47da0eebdb9_1280.jpg',
        webformatHeight: 426
      })
    )
    expect(store.getState().photo).toHaveProperty('photoToZoom', {
      largeImageURL:
        'https://pixabay.com/get/ea37b50e2ff11c22d2524518b74d4494eb75e5d51dac104490f6c47da0eebdb9_1280.jpg',
      webformatHeight: 426
    })
    expect(store.getState().photo).toHaveProperty('zoomInPhoto', true)
  })
  test('check isZoom function in photos', function() {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().photo).toHaveProperty('zoomInPhoto', false)
    store.dispatch(photoAction.isZoom(true))
    expect(store.getState().photo).toHaveProperty('zoomInPhoto', true)
    store.dispatch(photoAction.isZoom(false))
    expect(store.getState().photo).toHaveProperty('zoomInPhoto', false)
  })
})
