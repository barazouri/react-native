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
})
