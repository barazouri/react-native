import React from 'react'
import renderer from 'react-test-renderer'
import PhotoList from '../src/components/photos/photoList'
describe('photoList tests', function() {
  test('renders correctly', async () => {
    const testRenderer = renderer.create(
      <PhotoList
        headerMode={false}
        favoritePage={false}
        photos={[]}
        zoomInPhoto={false}
        photoToZoom={{}}
        favoritesPhotos={[]}
        keyBoardValue={''}
      />
    )
    expect(testRenderer.root.props).toHaveProperty('headerMode')
    // expect(testRenderer.root.props).toHaveProperty('favoritePage')
    // expect(testRenderer.root.props).toHaveProperty('photos')
    // expect(testRenderer.root.props).toHaveProperty('zoomInPhoto')
    // expect(testRenderer.root.props).toHaveProperty('photoToZoom')
    // expect(testRenderer.root.props).toHaveProperty('favoritesPhotos')
    // expect(testRenderer.root.props).toHaveProperty('keyBoardValue')
  })
})
