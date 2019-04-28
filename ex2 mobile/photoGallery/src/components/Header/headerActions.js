import { CHANGE_VISIBILITY, FAVORITE_CLICKED } from './headerActionType'

const changeInputVisibility = kind => ({ type: CHANGE_VISIBILITY, data: kind })
const favoriteClicked = kind => ({ type: FAVORITE_CLICKED, data: kind })
const handleGrid = () => changeInputVisibility(true)
const handleList = () => changeInputVisibility(false)

export default {
  handleGrid,
  handleList,
  favoriteClicked
}
