import { ZOOM_PHOTO, SET_LIKE, RETURN, SHOW_FAV, SET_PHOTOS_API } from './phothActionTypes'


const initialState = {
    photos: {},
}

export default(state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTOS_API:
        console.log(action.data)
            return{
                photos: action.data
            }
        default:
            return state
    }
}