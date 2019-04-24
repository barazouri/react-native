import {CHANGE_VISIBILITY} from './headerActionType'

const changeInputVisibility = kind => ({ type: CHANGE_VISIBILITY,data:kind})
const handleGrid = () => changeInputVisibility(true)
const handleList = () => changeInputVisibility(false)
// const handleAddTodoSubmission = () => async dispatch => {
//   dispatch(changeInputVisibility())
// }

export default {
  handleGrid,
  handleList,
}
