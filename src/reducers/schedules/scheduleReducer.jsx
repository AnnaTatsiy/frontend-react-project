import {ADD_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE, GET_SCHEDULE} from "../../actions/schedules/action_const";

// начальное состояние
const initialState = {
    list: [],
    errors: [],
    status: ""
}

export default function scheduleReducer(state = initialState, action){
    switch (action.type){
        //вывод расписания
        case GET_SCHEDULE:
            return {
                ...state,
                list: action.payload
            }

        //добавление
        case ADD_SCHEDULE:
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors,
                list:  (action.payload.status === 'success') ? [...state.list, action.payload.answer] : state.list
            }

        // редактирование
        case EDIT_SCHEDULE:
            const updated = action.payload.answer;
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors,
                list: (action.payload.status === 'success') ? state.list.map(workout => workout.id === updated.id ? updated : workout) : state.list
            }

        // удалить
        case DELETE_SCHEDULE:
            return {
                ...state,
                list: (action.payload.status === "success") ?  state.list.filter(a => a.id !== action.payload.answer.id) : state.list
            }

        default:
            return state;
    }
}