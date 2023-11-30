import api from '../api/axios.js';

class PersonalScheduleService{
    async getPersonalSchedule() {
        return await api.get('/api/coach/get-schedule');
    }

    async add(workout) {
         return await api.post('/api/coach/add-workout', workout);
    }

    async getPersonalScheduleForEdit() {
        return await api.get('/api/coach/get-schedule-for-edit');
    }

    async getPersonalScheduleEdit(data) {
        return await api.post('/api/coach/schedule-edit', data);
    }
}

export default new PersonalScheduleService();