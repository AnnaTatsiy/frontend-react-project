import {toast} from "react-toastify";

import CoachesService from "../../services/coachesService.jsx";
import {GET_COACHES, ADD_COACH, EDIT_COACH, GET_ALL_COACHES, GET_COACH, DELETE_COACH} from "./action_const";

//получение авторизированного тренера
export const getCoach = () =>
    async (dispatch) => {
        try {
            const response = await CoachesService.getCoach();
            dispatch({type: GET_COACH, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении информации о тренере')
        }
    };

// получение списка клиентов от сервера
export const getAllCoaches = () =>
    async (dispatch) => {
        try {
            const response = await CoachesService.getAllCoaches();
            dispatch({type: GET_ALL_COACHES, payload: response.data});
        } catch (error){
            //toast.error('Возникла ошибка при получении списка тренеров')
        }
    };

// получение списка тренеров от сервера постранично
export const getCoaches = (number) =>
    async (dispatch) => {
        try {
            const response = await CoachesService.getAll(number);
            dispatch({type: GET_COACHES, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка тренеров')
        }
    };

// добавление тренера
export const addCoach = (coach) =>
    async (dispatch) => {
        try {
            const response = await CoachesService.add(coach);
            dispatch({type: ADD_COACH, payload: response.data});
            if(response.data.status === 'success') {
                toast.success(`Тренер успешно добавлен!`);
            }else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при добавлении тренера'}`);
        }
    };

// удалить тренера
export const deleteCoach = (id) =>
    async (dispatch) => {
        try {
            const response = await CoachesService.delete(id);
            dispatch({type: DELETE_COACH, payload: response.data});
            if(response.data.status === 'success'){
                toast.success(`Увольнение тренера успешно завершено`);
            }  else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при увольнении тренера'}`);
        }
    };

//Редактирование тренера
export const editCoach = (coach) =>
    async (dispatch) => {
        try {
            const response = await CoachesService.edit(coach);
            dispatch({type: EDIT_COACH, payload: response.data});
            if(response.data.status === 'success') {
                toast.success(`Тренер успешно редактирован!`);
            }else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при редактировании тренера'}`);
        }
    };