import {
    ADD_LIMITED_SUBSCRIPTION, GET_ABOUT_LIMITED_SUBSCRIPTION,
    GET_ALL_LIMITED_SUBSCRIPTIONS,
    GET_LIMITED_SUBSCRIPTIONS
} from "../../actions/limitedSubscriptions/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    fullList: [],
    selectedSubscription: null,
    errors: [],
    state: ""
}

export default function limitedSubscriptionReducer(state = initialState, action) {

    switch (action.type) {

        case GET_ALL_LIMITED_SUBSCRIPTIONS:
            return {
                ...state,
                fullList: action.payload
            }

        case GET_LIMITED_SUBSCRIPTIONS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        //добавление
        case ADD_LIMITED_SUBSCRIPTION:
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors,
                list: (action.payload.answer !== null) ? [...state.list, action.payload.answer]  : state.list,
                fullList: (action.payload.answer !== null) ? [...state.fullList, action.payload.answer] : state.fullList
            }

        case GET_ABOUT_LIMITED_SUBSCRIPTION:
            return {
                ...state,
                selectedSubscription: action.payload
            }

        default:
            return state;
    }
}