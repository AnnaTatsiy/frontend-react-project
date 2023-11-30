
// начальное состояние
import {
    ADD_CUSTOMER,
    EDIT_CUSTOMER,
    GET_CUSTOMERS,
    GET_ALL_CUSTOMERS, VALIDATE_CUSTOMER,
} from "../../actions/customers/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    dataList: [],
    errors: [],
    status: ""
}

export default function customersReducer(state = initialState, action){

    switch (action.type){

        //список клиентов
        case GET_ALL_CUSTOMERS:
            return {
                ...state,
                dataList: action.payload,
            }

        //список клиентов постранично
        case GET_CUSTOMERS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        //добавление клиента
        case ADD_CUSTOMER:
            return {
                ...state,
           //     status: action.payload.status,
           //     errors: action.payload.errors,
                list:  (action.payload.answer !== null) ? [...state.list, action.payload.answer] : state.list,
                dataList: (action.payload.answer !== null) ? [...state.dataList, action.payload.answer] : state.dataList
            }

        case VALIDATE_CUSTOMER:
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors
            }

         // редактирование клиента
        case EDIT_CUSTOMER:
            const updatedCustomer = action.payload.answer;
            return {
                ...state,
                status: action.payload.status,
                errors: action.payload.errors,
                list: (action.payload.answer !== null) ? state.list.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer) : state.list,
                dataList: (action.payload.answer !== null) ? state.dataList.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer) : state.dataList,
            }

        default:
            return state;
    }
}