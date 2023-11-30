import {
    ALL_MARK_AS_READ,
    GET_ALL_NOTIFICATIONS,
    GET_UNREAD_NOTIFICATIONS,
    MARK_AS_READ_BY_ID
} from "../../actions/notifications/action_const.jsx";

const initialState = {
    allNotifications: [],
    unreadNotifications: []
}

export default function notificationReducer(state = initialState, action){

    switch (action.type) {

        case GET_ALL_NOTIFICATIONS:
            return{
                ...state,
                allNotifications: action.payload
            }

        case GET_UNREAD_NOTIFICATIONS:
            return {
                ...state,
                unreadNotifications: action.payload
            }

        case MARK_AS_READ_BY_ID:
            return {
                ...state,
                unreadNotifications: state.unreadNotifications.filter(a => a.id !== action.payload.id),
            }

        case ALL_MARK_AS_READ:
            return {
                ...state,
                unreadNotifications: []
            }

        default:
            return state;
    }
}