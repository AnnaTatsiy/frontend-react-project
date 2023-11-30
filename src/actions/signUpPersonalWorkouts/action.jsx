import {toast} from "react-toastify";
import SignUpPersonalWorkoutsService from "../../services/signUpPersonalWorkoutsService";
import {
    DELETE_SING_UP_PERSONAL_WORKOUTS,
    FILTERING_PERSONAL_WORKOUTS,
    GET_ALL_SING_UP_PERSONAL_WORKOUTS,
    GET_AMOUNT_WORKOUTS,
    GET_PERSONAL_AVAILABLE_WORKOUTS,
    GET_SING_UP_PERSONAL_WORKOUTS,
    GET_SING_UP_PERSONAL_WORKOUTS_BY_COACH,
    SING_UP_PERSONAL_WORKOUTS
} from "./action_const";

// получить список тренировок заданного тренера постранично

export const getSignUpPersonalWorkoutsByCoach = (id, page) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.getAllByCoach(id, page);
            dispatch({type:GET_SING_UP_PERSONAL_WORKOUTS_BY_COACH, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка персональных тренировок')
        }
    };

export const getAmountWorkouts = () =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.getAmountWorkouts();
            dispatch({type:GET_AMOUNT_WORKOUTS, payload: response.data});
        } catch (error){
            //toast.error('Возникла ошибка при получении количества тренировок в абонементе')
        }
    };

export const getSignUpPersonalWorkouts = (number) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.getAll(number);
            dispatch({type:GET_ALL_SING_UP_PERSONAL_WORKOUTS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка персональных тренировок')
        }
    };

export const filteringPersonalWorkouts = (params) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.filtering(params);
            dispatch({type: FILTERING_PERSONAL_WORKOUTS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при фильтрации персональных тренировок')
        }
    };

// получить свои актуальные записи на персональные тренировки
export const getCurrentSignUpPersonalWorkouts = () =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.getSignUpPersonalWorkouts();
            dispatch({type: GET_SING_UP_PERSONAL_WORKOUTS, payload: response.data});
            if(response.data.status === 'success'){
                toast.success(response.data.message);
            }  else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error('Возникла ошибка при получении актуальных записей на персональные тренировки')
        }
    };

// записаться на персональную тренировку
export const signUpPersonalWorkout = (id) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.signUpPersonalWorkout(id);
            dispatch({type: SING_UP_PERSONAL_WORKOUTS, payload: response.data});
            if(response.data.status === 'success'){
                toast.success(response.data.message);
            }  else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error('Возникла ошибка при регистрации записи на персональную тренировку')
        }
    };

// получить все доступные персональные тренировки для записи клиента
export const getPersonalAvailableWorkouts = () =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.getPersonalAvailableWorkouts();
            dispatch({type: GET_PERSONAL_AVAILABLE_WORKOUTS, payload: response.data});
            if(response.data.status === 'success'){
                toast.success(response.data.message);
            }  else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error('Возникла ошибка при получении записей на персональные тренировки')
        }
    };

//отмена записи на персональную тренировку
export const deleteSignUpPersonalWorkouts = (id) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.deleteSignUpPersonalWorkouts(id);
            dispatch({type: DELETE_SING_UP_PERSONAL_WORKOUTS, payload: response.data});
            if(response.data.status === 'success'){
                toast.success(response.data.message);
            }  else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error('Возникла ошибка при отмене записи на персональную тренировку')
        }
    };