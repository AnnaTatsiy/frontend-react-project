import api from '../api/axios.js';

class CustomersService {

    // получить список всех клиентов
    async getAllCustomers() {
        return await api.get('/api/customers/get-all');
    }

    // получить список всех клиентов постранично
    async getAll(number) {
        return await api.get('/api/customers/all', {params: {page: number}});
    }

    // проверка: данных для добавления клиента
    async validate(customer){
        return api.post('/api/customers/validate', customer);
    }

    // добавить клиента
    async add(customer){
        return api.post('/api/customers/add', customer);
    }

    // редактирование клиента
    async edit(customer){
        return api.post('/api/customers/edit', customer);
    }
}

export default new CustomersService();