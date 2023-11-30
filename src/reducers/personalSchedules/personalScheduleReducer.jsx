import {
    ADD_SCHEDULE,
    GET_PERSONAL_SCHEDULES,
    GET_PERSONAL_SCHEDULES_FOR_EDIT,
    EDIT_SCHEDULE
} from "../../actions/PersonalSchedules/action_const.jsx";

const initialState = {
    list: [],
    forEdit: [],
    errors: [],
    status: "",
}

export default function personalScheduleReducer(state = initialState, action){

    switch (action.type){

        case GET_PERSONAL_SCHEDULES:
            return {
                ...state,
                list: action.payload
            }

       case ADD_SCHEDULE:
            const updateList =  action.payload.answer;
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors,
                list: (updateList !== null)
                    ? [...state.list, updateList] : state.list
            }

        case EDIT_SCHEDULE:
            return {
                ...state,
                list: action.payload,
                forEdit: action.payload,
                errors: [],
                status: ""
            }

        case GET_PERSONAL_SCHEDULES_FOR_EDIT:
            return {
                ...state,
                forEdit: action.payload
            }

        default:
            return state;
    }

}