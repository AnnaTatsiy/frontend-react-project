import {toast} from "react-toastify";

import UnlimitedSubscriptionsService from "../../services/unlimitedSubscriptionsService";
import {
    ADD_UNLIMITED_SUBSCRIPTION,
    GET_ABOUT_SUBSCRIPTION,
    GET_ALL_UNLIMITED_SUBSCRIPTIONS,
    GET_UNLIMITED_SUBSCRIPTIONS
} from "./action_const";

// получить информацию об абонементе для авторизированного клиента
export const getAboutSubscription = () =>
    async (dispatch) => {
        try {
            const response = await UnlimitedSubscriptionsService.getAboutSubscription();
            dispatch({type: GET_ABOUT_SUBSCRIPTION, payload: response.data});
        } catch (error){
            //toast.error('Возникла ошибка при информацию о абонементе')
        }
    };

// получение списка абонементов от сервера
export const getAllUnlimitedSubscriptions = () =>
    async (dispatch) => {
        try {
            const response = await UnlimitedSubscriptionsService.getAllUnlimitedSubscriptions();
            dispatch({type: GET_ALL_UNLIMITED_SUBSCRIPTIONS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка абонементов')
        }
    };

// получение списка абонементов от сервера постранично
export const getUnlimitedSubscriptions = (number) =>
    async (dispatch) => {
        try {
            const response = await UnlimitedSubscriptionsService.getAll(number);
            dispatch({type: GET_UNLIMITED_SUBSCRIPTIONS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка абонементов')
        }
    };

// добавление
export const addUnlimitedSubscription = (subscription) =>
    async (dispatch) => {
        try {
            const response = await UnlimitedSubscriptionsService.add(subscription);
            dispatch({type: ADD_UNLIMITED_SUBSCRIPTION, payload: response.data});
            if(response.data.status === 'success') {
                toast.success(`Абонемент успешно оформлен!`);
            }else {
                toast.error(response.data.message);
            }
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при оформлении абонемента'}`);
        }
    };