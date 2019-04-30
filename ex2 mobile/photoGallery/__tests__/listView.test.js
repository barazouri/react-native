import React from 'react'
import renderer from 'react-test-renderer'
import { ListView } from '../src/components/ListView/listView'

describe('ListView tests', function() {
  test('renders correctly', async () => {
    const testRenderer = renderer.create(
      <ListView
        loading={false}
        keyBoardValue={''}
        photos={[]}
        favoritePage={false}
        favoritesPhotos={[]}
      />
    )
    expect(testRenderer.root.props).toHaveProperty('loading')
    expect(testRenderer.root.props).toHaveProperty('keyBoardValue')
    expect(testRenderer.root.props).toHaveProperty('photos')
    expect(testRenderer.root.props).toHaveProperty('favoritePage')
    expect(testRenderer.root.props).toHaveProperty('favoritesPhotos')
  })
  test('call acction change loading', async () => {
    const changeLoading = jest.fn()
    const testRenderer = renderer.create(
      <ListView
        changeLoading={changeLoading}
        loading={false}
        keyBoardValue={''}
        photos={[]}
        favoritePage={false}
        favoritesPhotos={[]}
      />
    )
    const ListViewComponent = testRenderer.root.findAllByType(ListView)[0]
    ListViewComponent.props.changeLoading(true)
    expect(changeLoading).toHaveBeenCalledTimes(1)
  })
  test('call acction setKeyboardValue', async () => {
    const setKeyboardValue = jest.fn()
    const testRenderer = renderer.create(
      <ListView
        setKeyboardValue={setKeyboardValue}
        loading={false}
        keyBoardValue={''}
        photos={[]}
        favoritePage={false}
        favoritesPhotos={[]}
      />
    )
    const ListViewComponent = testRenderer.root.findAllByType(ListView)[0]
    ListViewComponent.props.setKeyboardValue('this is a test')
    expect(setKeyboardValue).toHaveBeenCalledTimes(1)
  })
  test('call acction setPhotosApi', async () => {
    const setPhotosApi = jest.fn()
    const testRenderer = renderer.create(
      <ListView
        setPhotosApi={setPhotosApi}
        loading={false}
        keyBoardValue={''}
        photos={[]}
        favoritePage={false}
        favoritesPhotos={[]}
      />
    )
    const ListViewComponent = testRenderer.root.findAllByType(ListView)[0]
    ListViewComponent.props.setPhotosApi([])
    expect(setPhotosApi).toHaveBeenCalledTimes(1)
  })
})
