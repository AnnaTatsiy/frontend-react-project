// получить расписание от сервера
import {toast} from "react-toastify";

import {ADD_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE, GET_SCHEDULE} from "./action_const";
import ScheduleService from "../../services/scheduleService";

export const getSchedule = () =>
    async (dispatch) =>{
        try{
            const response = await ScheduleService.getAll();
            dispatch({type: GET_SCHEDULE, payload: response.data})
        }catch (error){
            toast.error('Возникла ошибка при получении расписания')
        }
    };

export const addSchedule = (schedule) =>
    async (dispatch) => {
        try {
            const response = await ScheduleService.add(schedule);
            dispatch({type: ADD_SCHEDULE, payload: response.data});
            if(response.data.status === 'success') {
                toast.success(`Тренировка успешно добавлена!`);
            }else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при добавлении тренировки'}`);
        }
    };

export const editSchedule = (schedule) =>
    async (dispatch) => {
        try {
            const response = await ScheduleService.edit(schedule);
            dispatch({type: EDIT_SCHEDULE, payload: response.data});
            if(response.data.status === 'success') {
                toast.success(`Тренировка успешно редактирована!`);
            }else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при редактировании тренировки'}`);
        }
    };

export const deleteSchedule = (id) =>
    async (dispatch) => {
        try {
            const response = await ScheduleService.delete(id);
            dispatch({type: DELETE_SCHEDULE, payload: response.data});
            if(response.data.status === 'success'){
                toast.success(`Удаление тренировки успешно завершено`);
            }  else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при удалении тренировки'}`);
        }
    };
