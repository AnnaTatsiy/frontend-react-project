import api from '../api/axios.js';

class ScheduleService {

    //получить расписание
    async getAll(){
        return await api.get('/api/schedules/all')
    }

    async add(schedule){
        return api.post('/api/schedules/add', schedule)
    }

    async delete(id){
        return api.post('/api/schedules/delete', id)
    }

    async edit(schedule){
        return api.post('/api/schedules/edit', schedule)
    }
}

export default new ScheduleService();