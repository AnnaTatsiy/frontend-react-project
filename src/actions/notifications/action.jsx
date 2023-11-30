
// получить все уведомления авторизированного пользователя
import NotificationsService from "../../services/notificationsService.jsx";
import {
    ALL_MARK_AS_READ,
    GET_ALL_NOTIFICATIONS,
    GET_UNREAD_NOTIFICATIONS,
    MARK_AS_READ_BY_ID
} from "./action_const.jsx";
import {toast} from "react-toastify";

export const getAllNotifications = () =>
    async (dispatch) => {
        try {
            const response = await NotificationsService.getAllNotifications();
            dispatch({type: GET_ALL_NOTIFICATIONS, payload: response.data});
        } catch (error){
            toast.error(error)
        }
    };

// получить непрочитанные уведомления авторизированного пользователя
export const getUnreadNotifications = () =>
    async (dispatch) => {
        try {
            const response = await NotificationsService.getUnreadNotifications();
            dispatch({type: GET_UNREAD_NOTIFICATIONS, payload: response.data});
        } catch (error){
            toast.error(error)
        }
    };

// отметить сообщение как прочитанное (доступ по id)
export const markAsReadById = (id) =>
    async (dispatch) => {
        try {
            const response = await NotificationsService.markAsReadById(id);
            dispatch({type: MARK_AS_READ_BY_ID, payload: response.data});
        } catch (error){
            toast.error(error)
        }
    };

// отметить все уведомления как прочитанные
export const allMarkAsRead = () =>
    async (dispatch) => {
        try {
            const response = await NotificationsService.allMarkAsRead();
            dispatch({type: ALL_MARK_AS_READ, payload: response.data});
        } catch (error){
            toast.error(error)
        }
    };