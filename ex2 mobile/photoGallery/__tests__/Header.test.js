import React from 'react'
import renderer from 'react-test-renderer'
import { Header } from '../src/components/Header/header'

describe('Header tests', function() {
  test('renders correctly', async () => {
    const testRenderer = renderer.create(
      <Header headerMode={false} favoritePage={false} zoomInPhoto={false} />
    )
    expect(testRenderer.root.props).toHaveProperty('headerMode')
    expect(testRenderer.root.props).toHaveProperty('favoritePage')
    expect(testRenderer.root.props).toHaveProperty('zoomInPhoto')
  })
})
