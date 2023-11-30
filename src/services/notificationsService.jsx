import api from '../api/axios.js';

class NotificationsService {

    // получить все уведомления авторизированного пользователя
    async getAllNotifications(){
        return await api.get(`/api/get-all-notifications`);
    }

    // получить непрочитанные уведомления авторизированного пользователя
    async getUnreadNotifications(){
        return await api.get(`/api/get-unread-notification`);
    }

    // отметить сообщение как прочитанное (доступ по id)
    async markAsReadById(id){
        return await api.post('/api/mark-as-read-by-id', id);
    }

    // отметить все уведомления как прочитанные
    async allMarkAsRead(){
        return await api.get('/api/all-mark-as-read');
    }
}

export default new NotificationsService();