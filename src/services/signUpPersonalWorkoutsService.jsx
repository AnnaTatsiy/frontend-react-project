import api from '../api/axios.js';

class SignUpPersonalWorkoutsService{

    // получить список всех тренировок постранично
    async getAll(number) {
        return await api.get(`/api/sign-up-personal-workouts/all?page=${number}`);
    }

    // получить список тренировок заданного тренера постранично
    async getAllByCoach(id, page){
        return await api.get(`/api/sign-up-personal-workouts/get-sign-up-personal-workouts-by-coach/${id}/${page}`);
    }

    async getAmountWorkouts(){
        return await api.get(`/api/customer/about-amount-workouts`);
    }

    //фильтрация
    async filtering(params){
        return api.get('/api/sign-up-personal-workouts/filtered/',
            {params:
                    {
                        page: params.page,
                        date_beg: params.date_beg,
                        date_end: params.date_end,
                        coach: params.coach,
                        customer: params.customer
                    }})
    }

    // получить свои актуальные записи на персональные тренировки
    async getSignUpPersonalWorkouts() {
        return api.get(`/api/customer/get-sign-up-personal-workouts`);
    }

    // записаться на персональную тренировку
    async signUpPersonalWorkout(id) {
        return api.post(`/api/customer/sign-up-personal-workout`, id);
    }

    // получить все доступные персональные тренировки для записи клиента
    async getPersonalAvailableWorkouts() {
        return api.get(`/api/customer/get-personal-available-workouts`);
    }

    //отмена записи на персональную тренировку
    async deleteSignUpPersonalWorkouts(id) {
        return api.post(`/api/customer/delete-sign-up-personal-workouts`, id);
    }
}

export default new SignUpPersonalWorkoutsService();