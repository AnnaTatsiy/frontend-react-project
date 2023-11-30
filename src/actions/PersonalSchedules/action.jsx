
import {toast} from "react-toastify";
import PersonalScheduleService from "../../services/personalScheduleService.jsx";
import {ADD_SCHEDULE, EDIT_SCHEDULE, GET_PERSONAL_SCHEDULES, GET_PERSONAL_SCHEDULES_FOR_EDIT} from "./action_const.jsx";

export const getPersonalSchedule = () =>
    async (dispatch) => {
        try {
            const response = await PersonalScheduleService.getPersonalSchedule();
            dispatch({type: GET_PERSONAL_SCHEDULES, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении расписания')
        }
    };

export const getPersonalScheduleForEdit = () =>
    async (dispatch) => {
        try {
            const response = await PersonalScheduleService.getPersonalScheduleForEdit();
            dispatch({type: GET_PERSONAL_SCHEDULES_FOR_EDIT, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении расписания')
        }
    };

export const getPersonalScheduleEdit = (data) =>
    async (dispatch) => {
        try {
            const response = await PersonalScheduleService.getPersonalScheduleEdit(data);
            dispatch({type: EDIT_SCHEDULE, payload: response.data});
            toast.success(`Расписание успешно изменено!`);
        } catch (error){
            toast.error('Возникла ошибка при редактировании расписания')
        }
    };

export const addPersonalSchedule = (workout) =>
    async (dispatch) => {
        try {
            const response = await PersonalScheduleService.add(workout);
            dispatch({type: ADD_SCHEDULE, payload: response.data});
            if(response.data.status === 'success') {
                toast.success(`Тренировка успешно добавлена!`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error('Возникла ошибка при добавлении тренировки')
        }
    };