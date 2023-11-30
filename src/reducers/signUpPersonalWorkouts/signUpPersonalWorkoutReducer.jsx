import {
    DELETE_SING_UP_PERSONAL_WORKOUTS,
    FILTERING_PERSONAL_WORKOUTS,
    GET_ALL_SING_UP_PERSONAL_WORKOUTS, GET_AMOUNT_WORKOUTS,
    GET_PERSONAL_AVAILABLE_WORKOUTS,
    GET_SING_UP_PERSONAL_WORKOUTS,
    GET_SING_UP_PERSONAL_WORKOUTS_BY_COACH, SING_UP_PERSONAL_WORKOUTS
} from "../../actions/signUpPersonalWorkouts/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    selectedPage: 1,
    isFiltered: null,
    customerListCurrent: [],
    customerListAvailable: [],
    count: 0,
    message: ''
}

export default function signUpPersonalWorkoutReducer(state = initialState, action){
    switch (action.type){

        case GET_AMOUNT_WORKOUTS:
            return {
                ...state,
                count: action.payload.count
            }

        //список тренировок постранично
        case GET_ALL_SING_UP_PERSONAL_WORKOUTS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page,
                selectedPage: action.payload.current_page,
                isFiltered: false
            }

        case FILTERING_PERSONAL_WORKOUTS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page,
                selectedPage: action.payload.current_page,
                isFiltered: true
            }

        case GET_SING_UP_PERSONAL_WORKOUTS_BY_COACH:
            return {
                ...state,
                list: action.payload,
                isFiltered: false
            }

        // получить свои актуальные записи на персональные тренировки
        case GET_SING_UP_PERSONAL_WORKOUTS:
            return {
                ...state,
                customerListCurrent: action.payload
            }

        // получить все доступные персональные тренировки для записи клиента
        case GET_PERSONAL_AVAILABLE_WORKOUTS:
            return {
                ...state,
                customerListAvailable: (action.payload.status === 'success' ) ? action.payload.answer : [],
                message: action.payload.message
            }

        // записаться на персональную тренировку
        case SING_UP_PERSONAL_WORKOUTS:
            return {
                ...state,
                customerListAvailable: (action.payload.status === 'success' ) ? (state.customerListAvailable.filter(w => w.id !== action.payload.answer.id)) : state.customerListAvailable,
                customerListCurrent: (action.payload.status === 'success' ) ? [...state.customerListCurrent, action.payload.answer] : state.customerListCurrent,
                message: action.payload.message,
                count: (action.payload.status === 'success' ) ? state.count - 1 : state.count
            }

        //отмена записи на персональную тренировку
        case DELETE_SING_UP_PERSONAL_WORKOUTS:
            return {
                ...state,
                customerListAvailable: (action.payload.status === 'success' ) ? [...state.customerListAvailable, action.payload.answer] : state.customerListAvailable,
                customerListCurrent: (action.payload.status === 'success' ) ? (state.customerListCurrent.filter(w => w.id !== action.payload.answer.id)) : state.customerListCurrent,
                message: action.payload.message,
                count: (action.payload.status === 'success' ) ? state.count + 1 : state.count
            }

        default:
            return state;
    }
}