
// начальное состояние
import {
    ADD_COACH,
    EDIT_COACH,
    GET_COACHES,
    GET_ALL_COACHES,
    GET_COACH,
    DELETE_COACH
} from "../../actions/coaches/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    dataList: [],
    authCoach: null,
    errors: [],
    status: ""
}

export default function coachesReducer(state = initialState, action){

    switch (action.type){

        //список тренера
        case GET_ALL_COACHES:
            return {
                ...state,
                dataList: action.payload
            }

        //список тренера постранично
        case GET_COACHES:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        //добавление тренера
        case ADD_COACH:
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors,
                list:  (action.payload.answer !== null) ? [...state.list, action.payload.answer] : state.list,
                dataList: (action.payload.answer !== null) ? [...state.dataList, action.payload.answer] : state.dataList
            }

        // удалить тренера
        case DELETE_COACH:
            return {
                ...state,
                list: (action.payload.status === "success") ?  state.list.filter(a => a.id !== action.payload.answer.id) : state.list,
                dataList: (action.payload.status === "success") ?  state.dataList.filter(a => a.id !== action.payload.answer.id) : state.dataList
            }

        // редактирование тренера
        case EDIT_COACH:
            const updatedCoach = action.payload.answer;
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors,
                list: (action.payload.answer !== null) ? state.list.map(coach => coach.id === updatedCoach.id ? updatedCoach : coach) : state.list,
                dataList: (action.payload.answer !== null) ? state.dataList.map(coach => coach.id === updatedCoach.id ? updatedCoach : coach) : state.dataList,
            }

        case GET_COACH:
            return {
                ...state,
                authCoach: action.payload
            }

        default:
            return state;
    }
}