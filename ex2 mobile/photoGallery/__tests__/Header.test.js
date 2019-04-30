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
  test('call action favoriteClicked', async () => {
    const favoriteClicked = jest.fn()
    const testRenderer = renderer.create(
      <Header
        headerMode={false}
        favoritePage={false}
        zoomInPhoto={false}
        favoriteClicked={favoriteClicked}
      />
    )
    const HeaderComponent = testRenderer.root.findAllByType(Header)[0]
    HeaderComponent.props.favoriteClicked(true)
    expect(favoriteClicked).toHaveBeenCalledTimes(1)
  })
  test('call action handleGrid and handleList', async () => {
    const handleGrid = jest.fn()
    const handleList = jest.fn()
    const testRenderer = renderer.create(
      <Header
        handleList={handleList}
        headerMode={false}
        favoritePage={false}
        zoomInPhoto={false}
        handleGrid={handleGrid}
      />
    )
    const HeaderComponent = testRenderer.root.findAllByType(Header)[0]
    HeaderComponent.props.handleGrid()
    expect(handleGrid).toHaveBeenCalledTimes(1)
    HeaderComponent.props.handleList()
    expect(handleList).toHaveBeenCalledTimes(1)
  })
})
